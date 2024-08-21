import { Component } from '@angular/core';
import { Form } from '@angular/forms';
import * as signalr from '@microsoft/signalr';
//import { error } from 'console';

@Component({
  selector: 'app-activity',
  // standalone: true,
  // imports: [],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent {
  ListActivity: Activity[] = []

  activityName! : string;
  activityAddress! : string;
  activityDescription! : string;
  complementareInformation! : string;
  posLat! : string;
  posLong! : string;
  organisateur_Id! : number;
  activity_Id! : number;

  hubConnection! : signalr.HubConnection;

  disable! : boolean;

  ngOnInit() {
    this.hubConnection = new signalr.HubConnectionBuilder()
        .withUrl("https://localhost:7069/activity")
        .build();

    this.hubConnection.on("receiveActivity",
      (activity : Activity) => {
        this.ListActivity.push(activity);
      });

    this.hubConnection.start()
      .then(() => console.log("Connected Rigth!!!!!"))
      .catch((error) => console.log(error))
  }
  submit() {
    const activity: Activity = {
      activityName: this.activityName,
      activityAddress: this.activityAddress,
      activityDescription: this.activityDescription,
      complementareInformation: this.complementareInformation,
      posLat: this.posLat,
      posLong: this.posLong,
      organisateur_Id: this.organisateur_Id,
      activity_Id: this.activity_Id
    };
    this.hubConnection.invoke("SubmitActivity", activity)
      .catch(err => console.error(err));
  }
}

export interface Activity {
  activityName : string;
  activityAddress : string;
  activityDescription : string;
  complementareInformation : string;
  posLat : string;
  posLong : string;
  organisateur_Id : number;
  activity_Id : number;
}