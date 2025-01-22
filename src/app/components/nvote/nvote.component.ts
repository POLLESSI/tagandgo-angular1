import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NVoteModel } from 'src/app/models/nvote/nvote.model';
import { NVoteCreationModel } from 'src/app/models/nvote/nvoteCreation.model';
import { NVoteEditionModel } from 'src/app/models/nvote/nvoteEdition.model';
import { NvoteService } from 'src/app/services/nvote.service';
import { MarkerService } from 'src/app/services/marker.service';
import { ActivityService } from '../../services/activity.service';
import { SignalRService } from 'src/app/services/signalr.service';
import { ActivitySyncService } from 'src/app/services/activitysync.service';
import { NEvenementSyncService } from '../../services/nevenementsync.service';
@Component({
  selector: 'app-nvote',
  templateUrl: './nvote.component.html',
  styleUrl: './nvote.component.css'
})
export class NvoteComponent implements OnInit {
  [x: string]: any;
  listNVotes: NVoteModel[] = [];

  nEvenement_Id! : number;
  funOrNot! : boolean;
  comment! : string;

  disable! : boolean;

  showForm: boolean;
  isFormEdition: boolean;
  nvoteToEdit: NVoteModel;

  displayedColumns: string[] = ['nEvenement_Id', 'funOrNot', 'comment']

  constructor(
    private signalRService: SignalRService,
    private nvoteService: NvoteService, 
    private markerService: MarkerService,
    private activitySyncService: ActivitySyncService,
    private nevenementSyncService: NEvenementSyncService
  ) {}

  public async ngOnInit(): Promise<void> {
    this.signalRService.startConnection();
    // Ecouter les mises à jour des marqueurs
    this.signalRService.onMarkerUpdate((activityId, markerData) => {
      console.log(`Activity ${activityId} marker updated:`, markerData);
    });
    this.activitySyncService.activityList$.subscribe(activities => {
      console.log('Activity list in NVoteComponent updated:', activities)
    });
    await this.getAllNVotes();
    this.activitySyncService.activityList$.subscribe(activities => {
      console.log('Updated activities:', activities);
    });
    this.nevenementSyncService.nEvenements$.subscribe(events => {
      console.log('Updated list of events in NVoteComponent:', events);
    });
  }

  public async getAllNVotes(): Promise<void> {
    try {
      this.listNVotes = await this.nvoteService.getAllNVotes();
      this.signalRService.onEventUpdate(updatedEvents => {
        updatedEvents.forEach(updatedEvent => {
          this.nevenementSyncService.addOrUpdateNEvenement(updatedEvent);
        });
      });

      console.log(this.listNVotes);

    } catch (error) {
      console.log("Error list Votes");
    }
  }
  public async submit(nVoteForm: NgForm): Promise<void> {
    if (nVoteForm.invalid) {
      console.log("Form is invalid");
      return;
    }

    if (!nVoteForm.invalid) {
      const updatedVote = {
        nEvenement_Id: this.nEvenement_Id,
        funOrNot: this.funOrNot,
        comment: this.comment,
      };

      //Emettre une mise à jour vers le service
      this.markerService.updateMarker(updatedVote);
      this['ActivityService'].refreshActivities();
    }

    if (this.isFormEdition) {
      const nVoteEdited: NVoteEditionModel = {
        nVote_Id: this.nvoteToEdit.nVote_Id,
        nEvenement_Id: this.nvoteToEdit.nEvenement_Id,
        funOrNot: this.nvoteToEdit.funOrNot,
        comment: this.nvoteToEdit.comment,
      };
      try {
        const response: NVoteModel = await this.nvoteService.createNVote(nVoteEdited);

        this.listNVotes.filter((v: NVoteModel) => v.nVote_Id != response.nVote_Id);

        this.listNVotes.push(response);
      } catch (error) {
        console.log("Error creating new vote!");
      }
    }
    else {
      const nvote: NVoteCreationModel = {
        nEvenement_Id: this.nEvenement_Id,
        funOrNot: this.funOrNot,
        comment: this.comment
      };
      try {
        const response: NVoteModel = await this.nvoteService.createNVote(nvote);
        this.listNVotes.push(response);

      } catch (error) {
        console.log("Error creating new vote");
      }
    }
  }

  public onEdition(nVote_Id: number): void {
    this.showForm = true;
    this.isFormEdition = true;

    this.nvoteToEdit = this.listNVotes.find((v: NVoteModel) => v.nVote_Id == nVote_Id);

    this.nEvenement_Id = this.nvoteToEdit.nEvenement_Id;
    this.funOrNot = this.nvoteToEdit.funOrNot;
    this.comment = this.nvoteToEdit.comment;
  }

  public onCancelForm(): void {
    this.showForm = false;
    this.isFormEdition = false;

    this.nEvenement_Id = null;
    this.funOrNot = null;
    this.comment = null;
  }
}

