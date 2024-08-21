import { Component } from '@angular/core';
import { Form } from '@angular/forms';
import * as signalr from '@microsoft/signalr';

@Component({
  selector: 'app-nuser',
  // standalone: true,
  // imports: [],
  templateUrl: './nuser.component.html',
  styleUrl: './nuser.component.css'
})
export class NuserComponent {
  ListNUser: NUser[] = []

  email! : string;
  pwd! : string;
  nPerson_Id! : number;
  role_Id! : string;
  avatar_Id! : number;
  point! : string;
  nUser_Id! : number;

  hubConnection! : signalr.HubConnection;

  disable! : boolean;

  ngOnInit() {
    this.hubConnection = new signalr.HubConnectionBuilder()
        .withUrl("https://localhost:7069/nuser")
        .build();
    this.hubConnection.on("receiveNUser",
      (nuser : NUser) => {
        this.ListNUser.push(nuser);
      });


    this.hubConnection.start()
        .then(() => console.log("Connected Rigth !!!!"))
        .catch((error) => console.log(error))
  }

  submit() {
    const nuser: NUser = {
      email: this.email,
      pwd: this.pwd,
      nPerson_Id: this.nPerson_Id,
      role_Id: this.role_Id,
      avatar_Id: this.avatar_Id,
      point: this.point,
      nUser_Id: this.nUser_Id
    };
    this.hubConnection.invoke("SubmitNUser", nuser)
        .catch(err => console.error(err));
  }
}

export interface NUser {
  email : string;
  pwd : string;
  nPerson_Id : number;
  role_Id : string;
  avatar_Id : number;
  point : string;
  nUser_Id : number;
}