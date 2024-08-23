import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import * as signalr from '@microsoft/signalr';
//import { error } from 'console';

@Component({
  selector: 'app-organisateur',
  // standalone: true,
  // imports: [],
  templateUrl: './organisateur.component.html',
  styleUrl: './organisateur.component.css'
})
export class OrganisateurComponent {
  ListOrganisateur: Organisateur[] = []

  companyName! : string;
  businessNumber! : string;
  nUser_Id! : number;
  point! : string;
  organisateur_Id! : number;

  hubConnection! : signalr.HubConnection;

  disable! : boolean;

  ngOnInit() {
    this.hubConnection = new signalr.HubConnectionBuilder()
        .withUrl("https://localhost:7069/organisateur")
        .build();

    this.hubConnection.on("receiveOrganisateur",
      (organisateur : Organisateur) => {
        this.ListOrganisateur.push(organisateur);
      });

    this.hubConnection.start()
      .then(() => console.log("Connected Rigth !!!!!"))
      .catch((error) => console.log(error));
  }

  onSubmit(form:NgForm) {
    console.log(form.value);
  }

  submit() {
    const organisateur: Organisateur = {
      companyName: this.companyName,
      businessNumber: this.businessNumber,
      nUser_Id: this.nUser_Id,
      point: this.point,
      organisateur_Id: this.organisateur_Id
    };
    this.hubConnection.invoke("SubmitOrganisateur", organisateur)
      .catch(err => console.error(err));
  }
}

export interface Organisateur {
  companyName : string;
  businessNumber : string;
  nUser_Id : number;
  point : string;
  organisateur_Id : number;
}