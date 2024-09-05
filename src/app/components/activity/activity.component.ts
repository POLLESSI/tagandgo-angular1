import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivityModel } from 'src/app/models/activity/activity.model'
import { ActivityCreationModel } from 'src/app/models/activity/activityCreation.model';
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
      console.log("Error List activities!");
    }
  }

  public async submit(activityForm: NgForm): Promise<void> {
    // Validation via le formulaire
    if (activityForm.invalid) {
      console.log("Form is invalid");
      return;
    }

    // Validation supplémentaire pour la latitude
    const latPattern = /^-?\d+\.\d{6}$/;
    const longPattern = latPattern;
    if (!latPattern.test(this.posLat) || !longPattern.test(this.posLat)) {
      console.log("Must be a decimal with up to 6 digits after the decimal point");
      return;
    }

    const activity: ActivityCreationModel = {
      activityName: this.activityName,
      activityAddress: this.activityAddress,
      activityDescription: this.activityDescription,
      complementareInformation: this.complementareInformation,
      posLat: this.posLat,
      posLong: this.posLong,
      organisateur_Id: this.organisateur_Id,
    };

    console.log(activity);

    try {
      const response: ActivityModel = await this.activityService.createActivity(activity);
      this.listActivities.push(response);

    } catch (error) {
      console.log("Error creating activity!");
    }
  }

}

