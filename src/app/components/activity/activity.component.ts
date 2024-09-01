import { Component, OnInit } from '@angular/core';
import { ActivityModel } from 'src/app/models/activity.model'
import { ActivityService } from 'src/app/services/activity.service';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent implements OnInit {

  listActivities: ActivityModel[] = [];

  activityName! : string;
  activityAddress! : string;
  activityDescription! : string;
  complementareInformation! : string;
  posLat! : string;
  posLong! : string;
  organisateur_Id! : number;
  activity_Id! : number;
  disable! : boolean;

  constructor(private activityService: ActivityService) {}

  public async ngOnInit(): Promise<void> {
    await this.getAllActivities();
  }

  public async getAllActivities(): Promise<void> {
    try {
      this.listActivities = await this.activityService.getAllActivities();

      console.log(this.listActivities);

    } catch (error) {
      console.log("Error List activities");
    }
  }

  public submit(): void {
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


  }
}

