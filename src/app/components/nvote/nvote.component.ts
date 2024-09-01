import { Component, OnInit } from '@angular/core';
import { NVoteModel } from 'src/app/models/nvote.model';
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
  nVote_Id! : number;

  disable! : boolean;

  constructor(private nvoteService: NvoteService) {}

  async ngOnInit(): Promise<void> {
    await this.getAllNVotes();
  }

  async getAllNVotes(): Promise<void> {
    try {
      this.ListNVotes = await this.nvoteService['getAllNVotes']();
    } catch (error) {
      console.log("Error list Votes");
    }
  }

  submit(): void {
    const nVote: NVoteModel = {
      nEvenement_Id: this.nEvenement_Id,
      funOrNot: this.funOrNot,
      comment: this.comment,
      nVote_Id: this.nVote_Id
    };
  }
}

