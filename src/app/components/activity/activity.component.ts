import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
//import * as signalr from '@microsoft/signalr';
import { ActivityModel } from 'src/app/models/activity.model'
import { ActivityService } from 'src/app/services/activity.service';
import { AvatarService } from 'src/app/services/avatar.service';
//import { error } from 'console';

@Component({
  selector: 'app-activity',
  // standalone: true,
  // imports: [],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent implements OnInit {
  ListActivities: ActivityModel[] = []

  activityName! : string;
  activityAddress! : string;
  activityDescription! : string;
  complementareInformation! : string;
  posLat! : string;
  posLong! : string;
  organisateur_Id! : number;
  activity_Id! : number;

  //hubConnection! : signalr.HubConnection;

  disable! : boolean;

  constructor(private activityService: ActivityService) {}

  async ngOnInit(): Promise<void> {
    await this.getAllActivities();
    console.log("OK");
    // this.hubConnection = new signalr.HubConnectionBuilder()
    //     .withUrl("https://localhost:7069/activity")
    //     .build();

    // this.hubConnection.on("receiveActivity",
    //   (activity : Activity) => {
    //     this.ListActivity.push(activity);
    //   });

    // this.hubConnection.start()
    //   .then(() => console.log("Connected Rigth!!!!!"))
    //   .catch((error) => console.log(error))
  }
  async getAllActivities(): Promise<void> {
    try {
      this.ListActivities = await this.activityService.getAllActivities();
      console.log(this.ListActivities);
    } catch (error) {
      console.log("Error List activities");
    }
  }
  submit(): void {
    const activity: ActivityModel = {
      activityName: this.activityName,
      activityAddress: this.activityAddress,
      activityDescription: this.activityDescription,
      complementareInformation: this.complementareInformation,
      posLat: this.posLat,
      posLong: this.posLong,
      organisateur_Id: this.organisateur_Id,
      activity_Id: this.activity_Id
    };
    // this.hubConnection.invoke("SubmitActivity", activity)
    //   .catch(err => console.error(err));
  }
}

