import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
//import * as signalr from '@microsoft/signalr';
import { NIconModel } from 'src/app/models/nicon.model';
import { NiconService } from 'src/app/services/nicon.service';
//import { error } from 'console';

@Component({
  selector: 'app-nicon',
  // standalone: true,
  // imports: [],
  templateUrl: './nicon.component.html',
  styleUrl: './nicon.component.css'
})
export class NiconComponent implements OnInit {
  ListNIcons: NIconModel[] = [];

  nIconName! : string;
  nIconDescription! : string;
  nIconUrl! : string;
  nIcon_Id! : number;

  //hubConnection! : signalr.HubConnection;

  disable! : boolean;

  constructor(private niconService: NiconService) {}

  async ngOnInit(): Promise<void> {
    await this.getAllNIcons();
    // this.hubConnection = new signalr.HubConnectionBuilder()
    //     .withUrl("https://localhost:7069/nicon")
    //     .build();

    // this.hubConnection.on("receiveNIcon",
    //   (nicon : NIconModel) => {
    //     this.ListNIcon.push(nicon);
    //   });

    // this.hubConnection.start()
    //   .then(() => console.log("Connected Rigth !!!!!"))
    //   .catch((error) => console.log(error))
  }

  async getAllNIcons(): Promise<void> {
    try {
      this.ListNIcons = await this.niconService['getAllNIcons']();
    } catch (error) {
      console.log("Error List Icons");
    }
  }

  onSubmit(form:NgForm) {
    console.log(form.value);
  }

  submit(): void {
    const nIcon: NIconModel = {
      nIconName: this.nIconName,
      nIconDescription: this.nIconDescription,
      nIconUrl: this.nIconUrl,
      nIcon_Id: this.nIcon_Id
    };
    // this.hubConnection.invoke("SubmitNIcon", nIcon)
    //   .catch(err => console.error(err));
  }
}

