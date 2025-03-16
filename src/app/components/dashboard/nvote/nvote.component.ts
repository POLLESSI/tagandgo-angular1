import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { CONST_API } from 'src/app/constants/api-constants';
import { NVoteModel } from 'src/app/models/nvote/nvote.model';
import { NVoteCreationModel } from 'src/app/models/nvote/nvoteCreation.model';
import { NVoteEditionModel } from 'src/app/models/nvote/nvoteEdition.model';
import { NvoteService } from 'src/app/services/nvote.service';
import { MarkerService } from 'src/app/services/marker.service';
import { ActivityService } from '../../../services/activity.service';
import { SignalRService } from 'src/app/services/signalr.service';
import { ActivitySyncService } from 'src/app/services/activitysync.service';
import { NEvenementSyncService } from '../../../services/nevenementsync.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RoutesDefined } from 'src/app/constants/routes';

@Component({
  selector: 'app-nvote',
  // template: `<button (click)="emitEvent()">Emit Event</button>`,
  templateUrl: './nvote.component.html',
  styleUrls: ['./nvote.component.css'],
  standalone: true,
  providers: [
    NvoteService,
    MarkerService,
    ActivityService,
    SignalRService,
    ActivitySyncService,
    NEvenementSyncService
  ], 
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatSlideToggleModule, 
    MatButtonModule,
    RouterModule
  ]
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
    this.nvoteService.addListener((nVotes: NVoteModel[]) => {
      console.log('Event received', nVotes);
    });
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

  emitEvent(): void {
    const nVotes: NVoteModel[] = [{
      nVote_Id: 1,
      nEvenement_Id: 1,
      funOrNot: true,
      comment: ''
    }];
    this.nvoteService.emitEvent(nVotes);
  } 

  public async getAllNVotes(): Promise<void> {
    try {
      const listNVotes = await this.nvoteService.getAllNVotes();
      console.log('Votes fetched from API', listNVotes);
      this.signalRService.onEventUpdate(updatedEvents => {
        updatedEvents.forEach(updatedEvent => {
          this.nevenementSyncService.addOrUpdateNEvenement(updatedEvent);
        });
      });

      console.log(this.listNVotes);

    } catch (error) {
      console.log("Error list Votes");
      console.error('Error fetching votes', error);
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

