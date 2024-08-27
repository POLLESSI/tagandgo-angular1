import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
//import * as signalr from '@microsoft/signalr';
import { OrganisateurModel } from 'src/app/models/organisateur.model';
import { OrganisateurService } from 'src/app/services/organisateur.service';
//import { error } from 'console';

@Component({
  selector: 'app-organisateur',
  // standalone: true,
  // imports: [],
  templateUrl: './organisateur.component.html',
  styleUrl: './organisateur.component.css'
})
export class OrganisateurComponent implements OnInit {
  ListOrganisateurs: OrganisateurModel[] = [];

  companyName! : string;
  businessNumber! : string;
  nUser_Id! : number;
  point! : string;
  organisateur_Id! : number;

  //hubConnection! : signalr.HubConnection;

  disable! : boolean;

  constructor(private organisateurService: OrganisateurService) {}

  async ngOnInit(): Promise<void> {
    await this.getAllOrganisateurs();
    // this.hubConnection = new signalr.HubConnectionBuilder()
    //     .withUrl("https://localhost:7069/organisateur")
    //     .build();

    // this.hubConnection.on("receiveOrganisateur",
    //   (organisateur : OrganisateurModel) => {
    //     this.ListOrganisateur.push(organisateur);
    //   });

    // this.hubConnection.start()
    //   .then(() => console.log("Connected Rigth !!!!!"))
    //   .catch((error) => console.log(error));
  }

  async getAllOrganisateurs(): Promise<void> {
    try {
      this.ListOrganisateurs = await this.organisateurService['getAllOrganisateurs']
    } catch (error) {
      console.log("Error list Organisators");
    }
  }

  onSubmit(form:NgForm) {
    console.log(form.value);
  }

  submit(): void {
    const organisateur: OrganisateurModel = {
      companyName: this.companyName,
      businessNumber: this.businessNumber,
      nUser_Id: this.nUser_Id,
      point: this.point,
      organisateur_Id: this.organisateur_Id
    };
    // this.hubConnection.invoke("SubmitOrganisateur", organisateur)
    //   .catch(err => console.error(err));
  }
}

