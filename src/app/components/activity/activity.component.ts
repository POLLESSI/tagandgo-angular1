import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivityModel } from 'src/app/models/activity/activity.model'
import { ActivityCreationModel } from 'src/app/models/activity/activityCreation.model';
import { ActivityEditionModel } from 'src/app/models/activity/activityEdition.model';
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

  showForm: boolean;
  isFormEdition: boolean;
  activityToEdit: ActivityModel;

  displayedColumns: string[] = ['activityName', 'activityAddress', 'activityDescription', 'complementareInformation', 'posLat', 'posLong', 'organisateur_Id', 'activity_Id'];

  constructor(private activityService: ActivityService) {
  }

  public async ngOnInit(): Promise<void> {
    await this.getAllActivities();``
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
    const latPattern = /^-?\d+\.\d{5}$/;
    const longPattern = latPattern;
    if (!latPattern.test(this.posLat) || !longPattern.test(this.posLat)) {
      console.log("Must be a decimal with up to 5 digits after the decimal point");
      return;
    }

    if (this.isFormEdition) {
      const activityEdited: ActivityEditionModel = {
        activity_Id: this.activityToEdit.activity_Id,
        activityName: this.activityName,
        activityAddress: this.activityAddress,
        activityDescription: this.activityDescription,
        complementareInformation: this.complementareInformation,
        posLat: this.posLat,
        posLong: this.posLong,
        organisateur_Id: this.organisateur_Id,
      };

      try {
        const response: ActivityModel = await this.activityService.updateActivity(activityEdited);

        this.listActivities.filter((a: ActivityModel) => a.activity_Id != response.activity_Id);

        this.listActivities.push(response);

      } catch (error) {
        console.log("Error update activity!");
      }
    }
    else {
      const activity: ActivityCreationModel = {
        activityName: this.activityName,
        activityAddress: this.activityAddress,
        activityDescription: this.activityDescription,
        complementareInformation: this.complementareInformation,
        posLat: this.posLat,
        posLong: this.posLong,
        organisateur_Id: this.organisateur_Id,
      };

      try {
        const response: ActivityModel = await this.activityService.createActivity(activity);
        this.listActivities.push(response);

      } catch (error) {
        console.log("Error creating activity!");
      }
    }
  }

  public onIdition(activity_Id: number): void {
    this.showForm = true;
    this.isFormEdition = true;

    this.activityToEdit = this.listActivities.find((a: ActivityModel) => a.activity_Id == activity_Id);

    this.activityName = this.activityToEdit.activityName;
    this.activityAddress = this.activityToEdit.activityAddress;
    this.activityDescription = this.activityToEdit.activityDescription;
    this.complementareInformation = this.activityToEdit.complementareInformation;
    this.posLat = this.activityToEdit.posLat;
    this.posLong = this.activityToEdit.posLong;
    this.organisateur_Id = this.activityToEdit.organisateur_Id;
  }

  public onCancelForm(): void {
    this.showForm = false;
    this.isFormEdition = false;

    this.activityName = null;
    this.activityAddress = null;
    this.activityDescription = null;
    this.complementareInformation = null;
    this.posLat = null;
    this.posLong = null;
    this.organisateur_Id = null;
  }
}

