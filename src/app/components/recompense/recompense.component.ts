import { Component } from '@angular/core';
import { Form, NgForm} from '@angular/forms';
import * as signalr from '@microsoft/signalr';
//import { error } from 'console';

@Component({
  selector: 'app-recompense',
  // standalone: true,
  // imports: [],
  templateUrl: './recompense.component.html',
  styleUrl: './recompense.component.css'
})
export class RecompenseComponent {
  ListRecompense: Recompense[] = []

  definition! : string;
  point! : string;
  implication! : string;
  granted! : boolean;
  recompense_Id! : number;

  hubConnection! : signalr.HubConnection;

  disable! : boolean;

  ngOnInit() {
    this.hubConnection = new signalr.HubConnectionBuilder()
        .withUrl("https://localhost:7069/recompense")
        .build();

    this.hubConnection.on("receiveRecompense",
      (recompense : Recompense) => {
        this.ListRecompense.push(recompense);
      });

    this.hubConnection.start()
      .then(() => console.log("Connected Rigth !!!!!!"))
      .catch((error) => console.log(error))
  }

  onSubmit(form:NgForm) {
    console.log(form.value);
  }

  submit() {
    const recompense: Recompense = {
      definition: this.definition,
      point: this.point,
      implication: this.implication,
      granted: this.granted,
      recompense_Id: this.recompense_Id
    };
    this.hubConnection.invoke("SubmitRecompense", recompense)
      .catch(err => console.error(err));
  }
}

export interface Recompense {
  definition : string;
  point : string;
  implication : string;
  granted : boolean;
  recompense_Id : number;
}