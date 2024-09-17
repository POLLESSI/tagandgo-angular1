import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NVoteModel } from 'src/app/models/nvote/nvote.model';
import { NVoteCreationModel } from 'src/app/models/nvote/nvoteCreation.model';
import { NVoteEditionModel } from 'src/app/models/nvote/nvoteEdition.model';
import { NvoteService } from 'src/app/services/nvote.service';
@Component({
  selector: 'app-nvote',
  templateUrl: './nvote.component.html',
  styleUrl: './nvote.component.css'
})
export class NvoteComponent implements OnInit {
  listNVotes: NVoteModel[] = [];

  nEvenement_Id! : number;
  funOrNot! : boolean;
  comment! : string;

  disable! : boolean;

  showForm: boolean;
  isFormEdition: boolean;
  nvoteToEdit: NVoteModel;

  displayedColumns: string[] = ['nEvenement_Id', 'funOrNot', 'comment']

  constructor(private nvoteService: NvoteService) {}

  public async ngOnInit(): Promise<void> {
    await this.getAllNVotes();
  }

  public async getAllNVotes(): Promise<void> {
    try {
      this.listNVotes = await this.nvoteService.getAllNVotes();

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

