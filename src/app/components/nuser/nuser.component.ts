import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
//import * as signalr from '@microsoft/signalr';
import { NUserModel } from 'src/app/models/nuser.model';
import { NuserService } from 'src/app/services/nuser.service';

@Component({
  selector: 'app-nuser',
  // standalone: true,
  // imports: [],
  templateUrl: './nuser.component.html',
  styleUrl: './nuser.component.css'
})
export class NuserComponent implements OnInit {
  ListNUsers: NUserModel[] = [];

  email! : string;
  pwd! : string;
  nPerson_Id! : number;
  role_Id! : string;
  avatar_Id! : number;
  point! : string;
  nUser_Id! : number;

  //hubConnection! : signalr.HubConnection;

  disable! : boolean;

  constructor(private nuserService: NuserService) {}

  async ngOnInit(): Promise<void> {
    await this.getAllNUsers();
    // this.hubConnection = new signalr.HubConnectionBuilder()
    //     .withUrl("https://localhost:7069/nuser")
    //     .build();
    // this.hubConnection.on("receiveNUser",
    //   (nuser : NUserModel) => {
    //     this.ListNUser.push(nuser);
    //   });


    // this.hubConnection.start()
    //     .then(() => console.log("Connected Rigth !!!!"))
    //     .catch((error) => console.log(error))
  }

  async getAllNUsers(): Promise<void> {
    try {
      this.ListNUsers = await this.nuserService['getAllNUsers']();
    } catch (error) {
      console.log("Error List Users");
    }
  }

  submit(): void {
    const nuser: NUserModel = {
      email: this.email,
      pwd: this.pwd,
      nPerson_Id: this.nPerson_Id,
      role_Id: this.role_Id,
      avatar_Id: this.avatar_Id,
      point: this.point,
      nUser_Id: this.nUser_Id
    };
    // this.hubConnection.invoke("SubmitNUser", nuser)
    //     .catch(err => console.error(err));
  }
}

