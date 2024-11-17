import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DateTime } from 'luxon';
import { ActivityModel } from 'src/app/models/activity/activity.model'
import { ActivityCreationModel } from 'src/app/models/activity/activityCreation.model';
import { ActivityEditionModel } from 'src/app/models/activity/activityEdition.model';
import { ActivityService } from 'src/app/services/activity.service';
import * as L from 'leaflet';

export type MarkerFactory = { values: any[], markerFn: Function, popupFn?: Function }

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent implements OnInit {

  listActivities: ActivityModel[] = [];

  id! : number;
  name! : string;
  address! : string;
  startDate!: DateTime;
  endDate!: DateTime;
  description! : string;
  additionalInformation! : string;
  location! : string;
  active!: boolean;

  //organisateur_Id! : number;

  disable! : boolean;

  showForm: boolean;
  isFormEdition: boolean;
  activityToEdit: ActivityModel | null = null;

  displayedColumns: string[] = ['name', 'address',  'startDate',  'endDate', 'description', 'additionalInformation', 'location', 'id'];

  constructor(private activityService: ActivityService) {
  }

  public async ngOnInit(): Promise<void> {
    await this.getAllActivities();``
  }

  public async getAllActivities(): Promise<void> {
    try {
      this.listActivities = await this.activityService.getAllActivities();

      console.log('List of activities:', this.listActivities);

    } catch (error) {
      console.error('Error fetching activities:', error);
      alert('Unable to load activities. Check your internet connection or try again later.');
    }
  }

  public async submit(activityForm: NgForm): Promise<void> {
    // Validation via le formulaire
    if (activityForm.invalid) {
      console.log("Form is invalid");
      return;
    }

    console.log(this.isFormEdition);

    if (this.isFormEdition) {
      const activityEdited: ActivityEditionModel = {
        Id: this.activityToEdit.Id,
        Name: this.name,
        Address: this.address,
        StartDate: this.startDate,
        EndDate: this.endDate,
        Description: this.description,
        AdditionalInformation: this.additionalInformation,
        Location: this.location
      };


      try {
        console.log("Activity to edit:", activityEdited);

        const response: ActivityModel = await this.activityService.createActivity(activityEdited);

        this.listActivities.filter((a: ActivityModel) => a.Id != response.Id);

        this.listActivities.push(response);

        activityForm.resetForm();

        this.cancelForm();

      } catch (error) {
        console.log("Error update activity!");
      }
    }
    else {
      console.log("ICI");

      const activity: ActivityCreationModel = {
        Name: this.name,
        Address: this.address,
        StartDate: this.startDate,
        EndDate: this.endDate,
        Description: this.description,
        AdditionalInformation: this.additionalInformation,
        Location: this.location
      };

      try {
        const response: ActivityModel = await this.activityService.createActivity(activity);

        console.log(this.listActivities);
        console.log(response);

        this.listActivities.push(response);

        activityForm.resetForm();

        this.cancelForm();

      } catch (error) {
        console.log("Error creating activity!");
      }
    }
  }

  public onIdition(id: number): void {
    this.showForm = true;
    this.isFormEdition = true;

    this.activityToEdit = this.listActivities.find((a: ActivityModel) => a.Id == id);

    this.name = this.activityToEdit.Name;
    this.address = this.activityToEdit.Address;
    this.description = this.activityToEdit.Description;
    this.additionalInformation = this.activityToEdit.AdditionalInformation;
    this.location = this.activityToEdit.Location;

    //this.organisateur_Id = this.activityToEdit.organisateur_Id;
  }

  public onCancelForm(): void {
    this.cancelForm();
  }

  public cancelForm(): void {
    this.showForm = false;
    this.isFormEdition = false;

    this.name = null;
    this.address = null;
    this.description = null;
    this.additionalInformation = null;
    this.location = null;
    //this.organisateur_Id = null;
  }
}




