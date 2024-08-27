import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
//import * as signalr from '@microsoft/signalr';
import { NVoteModel } from 'src/app/models/nvote.model';
import { NvoteService } from 'src/app/services/nvote.service';
//import { error } from 'console';

@Component({
  selector: 'app-nvote',
  // standalone: true,
  // imports: [],
  templateUrl: './nvote.component.html',
  styleUrl: './nvote.component.css'
})
export class NvoteComponent implements OnInit {
  ListNVotes: NVoteModel[] = [];

  nEvenement_Id! : number;
  funOrNot! : boolean;
  comment! : string;
  nVote_Id! : number;

  //hubConnection! : signalr.HubConnection;

  disable! : boolean;

  constructor(private nvoteService: NvoteService) {}

  async ngOnInit(): Promise<void> {
    await this.getAllNVotes();
    // this.hubConnection = new signalr.HubConnectionBuilder()
    //     .withUrl("https://localhost:7069/nvote")
    //     .build();

    // this.hubConnection.on("receiveNVote",
    //   (nvote : NVoteModel) => {
    //     this.ListNVote.push(nvote);
    //   });

    // this.hubConnection.start()
    //   .then(() => console.log("Connected Rigth !!!!!!"))
    //   .catch((error) => console.log(error));
  }

  async getAllNVotes(): Promise<void> {
    try {
      this.ListNVotes = await this.nvoteService['getAllNVotes']();
    } catch (error) {
      console.log("Error list Votes");
    }
  }

  onSubmit(form:NgForm) {
    console.log(form.value);
  }

  submit(): void {
    const nVote: NVoteModel = {
      nEvenement_Id: this.nEvenement_Id,
      funOrNot: this.funOrNot,
      comment: this.comment,
      nVote_Id: this.nVote_Id
    };
    // this.hubConnection.invoke("SubmitNVote", nVote)
    //   .catch(err => console.error(err));
  }
}

