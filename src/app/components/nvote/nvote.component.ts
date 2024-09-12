import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NVoteModel } from 'src/app/models/nvote/nvote.model';
import { NVoteCreationModel } from 'src/app/models/nvote/nvoteCreation.model';
import { NvoteService } from 'src/app/services/nvote.service';
@Component({
  selector: 'app-nvote',
  templateUrl: './nvote.component.html',
  styleUrl: './nvote.component.css'
})
export class NvoteComponent implements OnInit {
  ListNVotes: NVoteModel[] = [];

  nEvenement_Id! : number;
  funOrNot! : boolean;
  comment! : string;

  disable! : boolean;

  constructor(private nvoteService: NvoteService) {}

  public async ngOnInit(): Promise<void> {
    await this.getAllNVotes();
  }

  public async getAllNVotes(): Promise<void> {
    try {
      this.ListNVotes = await this.nvoteService['getAllNVotes']();
    } catch (error) {
      console.log("Error list Votes");
    }
  }
  public async submit(nVoteForm: NgForm): Promise<void> {
    if (nVoteForm.invalid) {
      console.log("Form is invalid");
      return;
    }
    const nVote: NVoteCreationModel = {
      nEvenement_Id: this.nEvenement_Id,
      funOrNot: this.funOrNot,
      comment: this.comment
    };

    console.log(nVote);

    try {
      const response: NVoteModel = await this.nvoteService.createNVote(nVote);
      this.ListNVotes.push(response);
    } catch (error) {
      console.log("Error creating new vote!");
    }
  }
}

