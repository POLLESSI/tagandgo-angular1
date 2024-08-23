import { Component } from '@angular/core';
import { Form } from '@angular/forms';
import * as signalr from '@microsoft/signalr';
//import { error } from 'console';

@Component({
  selector: 'app-nevenement',
  // standalone: true,
  // imports: [],
  templateUrl: './nevenement.component.html',
  styleUrl: './nevenement.component.css'
})
export class NevenementComponent {
  ListNEvenement: NEvenement[] = []

  nEvenementDate! : string;
  nEvenementName! : string;
  nEvenementDescription! : string;
  posLat! : string;
  posLong! : string;
  positif! : boolean;
  organisateur_Id! : number;
  nIcon_Id! : number;
  recompense_Id! : number;
  bonus_Id! : number;
  mediaItem_Id! : number;
  nEvenement_Id! : number;

  hubConnection! : signalr.HubConnection;

  disable! : boolean;

  ngOnInit() {
    this.hubConnection = new signalr.HubConnectionBuilder()
        .withUrl("https://localhost:7069/nevenement")
        .build();

    this.hubConnection.on("receiveNEvenement",
      (nevenement : NEvenement) => {
        this.ListNEvenement.push(nevenement);
      });

    this.hubConnection.start()
    .then(() => console.log("Connected Rigth !!!!!"))
    .catch((error) => console.log(error))
  }
  submit() {
    const nevenement: NEvenement = {
      nEvenementDate: this.nEvenementDate,
      nEvenementName: this.nEvenementName,
      nEvenementDescription: this.nEvenementDescription,
      posLat: this.posLat,
      posLong: this.posLong,
      positif: this.positif,
      organisateur_Id: this.organisateur_Id,
      nIcon_Id: this.nIcon_Id,
      recompense_Id: this.recompense_Id,
      bonus_Id: this.bonus_Id,
      mediaItem_Id: this.mediaItem_Id,
      nEvenement_Id: this.nEvenement_Id
    };
    this.hubConnection.invoke("SubmitNEvenement", nevenement)
      .catch(err => console.error(err));
  }
}

export interface NEvenement {
  nEvenementDate : string;
  nEvenementName : string;
  nEvenementDescription : string;
  posLat : string;
  posLong : string;
  positif : boolean;
  organisateur_Id : number;
  nIcon_Id : number;
  recompense_Id : number;
  bonus_Id : number;
  mediaItem_Id : number;
  nEvenement_Id : number;
}