import { Component } from '@angular/core';
import { Form } from '@angular/forms';
import * as signalr from '@microsoft/signalr';
// import { error } from 'console';

@Component({
  selector: 'app-nperson',
  // standalone: true,
  // imports: [],
  templateUrl: './nperson.component.html',
  styleUrl: './nperson.component.css'
})
export class NpersonComponent {
  ListNPerson: NPerson[] = []

  lastname! : string;
  firstname! : string;
  email! : string;
  addess_Street! : string;
  address_Nbr! : string;
  postalCode! : string;
  address_City! : string;
  address_Country! : string;
  telephone! : string;
  gsm! : string;
  NPerson_Id! : number;

  hubConnection! : signalr.HubConnection;

  disable! : boolean;

  ngOnInit() {
    this.hubConnection = new signalr.HubConnectionBuilder()
        .withUrl("https://localhost:7069/nperson")
        .build();

    this.hubConnection.on("receiveNPerson",
      (nperson: NPerson) => {
        this.ListNPerson.push(nperson);
      });

    this.hubConnection.start()
        .then(() => console.log("Connected Rigth !!!!!"))
        .catch((error) => console.log(error))
  }

  submit() {
    const nperson: NPerson = {
      lastname: this.lastname,
      firstname: this.firstname,
      email: this.email,
      address_street: this.addess_Street,
      address_Nbr: this.address_Nbr,
      postalCode: this.postalCode,
      address_City: this.address_City,
      address_Country: this.address_Country,
      telephone: this.telephone,
      gsm: this.gsm,
      NPerson_Id: this.NPerson_Id
    };
    this.hubConnection.invoke("SubmitNPerson", nperson)
        .catch(err => console.error(err));
  }

}

export interface NPerson {
  lastname : string;
  firstname : string;
  email : string;
  address_street : string;
  address_Nbr : string;
  postalCode : string;
  address_City : string;
  address_Country : string;
  telephone : string;
  gsm : string;
  NPerson_Id : number;
}
