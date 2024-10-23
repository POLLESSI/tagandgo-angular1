import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivityModel } from 'src/app/models/activity/activity.model'
import { ActivityCreationModel } from 'src/app/models/activity/activityCreation.model';
import { ActivityEditionModel } from 'src/app/models/activity/activityEdition.model';
import { ActivityService } from 'src/app/services/activity.service';
// import * as L from 'leaflet';

export type MarkerFactory = { values: any[], markerFn: Function, popupFn?: Function }

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent implements OnInit, AfterViewInit {
  // private map!: L.Map;
  // private markers: L.Marker[] = [];

  listActivities: ActivityModel[] = [];

  activity_Id! : number;
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
  ngAfterViewInit(): void {
    //this.initMap();
    //throw new Error('Method not implemented.');
  }

  public async ngOnInit(): Promise<void> {
    await this.getAllActivities();``
  }

  // private initMap(): void {
  //   this.map = L.map('map', {
  //     center: [50.82788, 4.37218],
  //     zoom: 13
  //   });

  //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     maxZoom: 19,
  //   }).addTo(this.map);
  // }

  // private addOrUpdateMarker(activity: ActivityModel): void {
  //   // Find existing marker
  //   let existingMarker = this.markers.find(marker => marker.options.title === activity.activityName);

  //   if (existingMarker) {
  //     existingMarker.setLatLng([activity.posLat, activity.posLong]);
  //     existingMarker.bindPopup('<b>${activity.activityName}</b><br />${activity.activityDescription}').openPopup();
  //   } else {
  //     // Create new marker
  //     let newMarker = L.marker([activity.posLat, activity.posLong], { title: activity.activityName });
  //     newMarker.bindPopup('<b>${activity.activityName}</b><br />${activity.activityDescription}');
  //     newMarker.addTo(this.map);
  //     this.markers.push(newMarker);
  //   }
  // }

  public async getAllActivities(): Promise<void> {
    try {
      this.listActivities = await this.activityService.getAllActivities();

      console.log('List of activities:', this.listActivities);

    } catch (error) {
      console.error('Error fetching activities:', error);
      alert('Failed to fetch activities. Please try again later.');
    }
  }

  public async submit(activityForm: NgForm): Promise<void> {
    // Validation via le formulaire
    if (activityForm.invalid) {
      console.log("Form is invalid");
      return;
    }

    // Validation supplémentaire pour la latitude
    const latPattern = /^-?\d+\.\d{1,6}$/;
    const longPattern = latPattern;
    if (!latPattern.test(this.posLat) || !longPattern.test(this.posLat)) {
      console.log("Must be a decimal with up to 5 digits after the decimal point");
      return;
    }

    console.log(this.isFormEdition);

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
        console.log("Activity to edit:", activityEdited);

        const response: ActivityModel = await this.activityService.updateActivity(activityEdited);

        this.listActivities.filter((a: ActivityModel) => a.activity_Id != response.activity_Id);

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
  public async createActivity(activityForm: NgForm): Promise<void> {
    if (activityForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const newActivity: ActivityCreationModel = {
      activityName: this.activityName,
      activityAddress: this.activityAddress,
      activityDescription: this.activityDescription,
      complementareInformation:this.complementareInformation,
      posLat: this.posLat,
      posLong: this.posLong,
      organisateur_Id: this.organisateur_Id,
    };
    try {
      const response = await this.activityService.createActivity(newActivity);
      this.listActivities.push(response); //Update the list with the new activity
      console.log('Activity created:', response);
      activityForm.resetForm();
      this.cancelForm();
      alert('Activity created successfully');
    } catch (error) {
      console.error("Error creating activity:", error);
      alert('Failed to create activity. Please try again.');
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
    this.cancelForm();
  }

  public cancelForm(): void {
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

  public async deleteActivity(activity_Id: number): Promise<void> {
    try {
      await this.activityService.deleteActivity(activity_Id);
      this.listActivities = this.listActivities.filter(a => a.activity_Id !== activity_Id);
      alert('Activity deleted successfully');
    } catch (error) {
      console.log("Error deleting activity:", error);
    }
  }
  public async updateActivity(activityForm: NgForm): Promise<void> {
    if (activityForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const activityUpdated: ActivityEditionModel = {
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
      const updatedActivity = await this.activityService.updateActivity(activityUpdated);
      //Update the list with the updated activity
      const index = this.listActivities.findIndex(a => a.activity_Id === updatedActivity.activity_Id);
      if (index !== -1) {
        this.listActivities[index] = updatedActivity;
      }
      console.log('Activity updated:', updatedActivity);
      activityForm.resetForm();
      this.cancelForm();
      alert('Activity updated susseccfully');
    } catch (error) {
      console.error('Error updating activity:', error);
      alert('Failed to update activity. Please try again');
    }
  }
}




