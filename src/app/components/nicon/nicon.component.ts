import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import * as signalr from '@microsoft/signalr';
//import { error } from 'console';

@Component({
  selector: 'app-nicon',
  // standalone: true,
  // imports: [],
  templateUrl: './nicon.component.html',
  styleUrl: './nicon.component.css'
})
export class NiconComponent {
  ListNIcon: NIcon[] = []

  nIconName! : string;
  nIconDescription! : string;
  nIconUrl! : string;
  nIcon_Id! : number;

  hubConnection! : signalr.HubConnection;

  disable! : boolean;

  ngOnInit() {
    this.hubConnection = new signalr.HubConnectionBuilder()
        .withUrl("https://localhost:7069/nicon")
        .build();

    this.hubConnection.on("receiveNIcon",
      (nicon : NIcon) => {
        this.ListNIcon.push(nicon);
      });

    this.hubConnection.start()
      .then(() => console.log("Connected Rigth !!!!!"))
      .catch((error) => console.log(error))
  }

  onSubmit(form:NgForm) {
    console.log(form.value);
  }

  submit() {
    const nIcon: NIcon = {
      nIconName: this.nIconName,
      nIconDescription: this.nIconDescription,
      nIconUrl: this.nIconUrl,
      nIcon_Id: this.nIcon_Id
    };
    this.hubConnection.invoke("SubmitNIcon", nIcon)
      .catch(err => console.error(err));
  }
}

export interface NIcon {
  nIconName : string;
  nIconDescription : string;
  nIconUrl : string;
  nIcon_Id : number;
}