import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import * as signalr from '@microsoft/signalr';
//import { error } from 'console';

@Component({
  selector: 'app-nvote',
  // standalone: true,
  // imports: [],
  templateUrl: './nvote.component.html',
  styleUrl: './nvote.component.css'
})
export class NvoteComponent {
  ListNVote: NVote[] = []

  nEvenement_Id! : number;
  funOrNot! : boolean;
  comment! : string;
  nVote_Id! : number;

  hubConnection! : signalr.HubConnection;

  disable! : boolean;

  ngOnInit() {
    this.hubConnection = new signalr.HubConnectionBuilder()
        .withUrl("https://localhost:7069/nvote")
        .build();

    this.hubConnection.on("receiveNVote",
      (nvote : NVote) => {
        this.ListNVote.push(nvote);
      });

    this.hubConnection.start()
      .then(() => console.log("Connected Rigth !!!!!!"))
      .catch((error) => console.log(error));
  }

  onSubmit(form:NgForm) {
    console.log(form.value);
  }

  submit() {
    const nVote: NVote = {
      nEvenement_Id: this.nEvenement_Id,
      funOrNot: this.funOrNot,
      comment: this.comment,
      nVote_Id: this.nVote_Id
    };
    this.hubConnection.invoke("SubmitNVote", nVote)
      .catch(err => console.error(err));
  }
}

export interface NVote {
  nEvenement_Id : number;
  funOrNot : boolean;
  comment : string;
  nVote_Id : number;
}