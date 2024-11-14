import { Component, ComponentRef, ElementRef, EmbeddedViewRef, HostBinding, HostListener, Input, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
//import { SignalRService } from 'src/app/services/signalr.service';
import { NgForm } from '@angular/forms';
import { firstValueFrom} from 'rxjs';
import { CONST_API } from 'src/app/constants/api-constants';
import { ActivityModel } from 'src/app/models/activity/activity.model'
import { ActivityCreationModel } from 'src/app/models/activity/activityCreation.model';
import { ActivityEditionModel } from 'src/app/models/activity/activityEdition.model';
import { ActivityService } from 'src/app/services/activity.service';
import * as L from 'leaflet';
import {marker, Util} from "leaflet";
import isArray = Util.isArray;
//import * as signalR from '@microsoft/signalr';

export type MarkerFactory = { values: any[], markerFn: Function, popupFn?: Function }

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent implements OnInit, AfterViewInit {
  
  private map!: L.Map;
  private markers: L.Marker[] = [];

  listActivities: ActivityModel[] = [];
  
  activity_Id! : number;
  activityName! : string;
  activityAddress! : string;
  activityDescription! : string;
  complementareInformation! : string;
  posLat! : number;
  posLong! : number;
  organisateur_Id! : number;

  disable! : boolean;

  showForm: boolean;
  isFormEdition: boolean;
  activityToEdit: ActivityModel;

  displayedColumns: string[] = [
    'activityName', 
    'activityAddress', 
    'activityDescription', 
    'complementareInformation',
    'posLat', 
    'posLong', 
    'organisateur_Id', 
    'activity_Id'
  ];
  activity: any;
  constructor(private activityService: ActivityService) {}

  // 

  public async ngOnInit(): Promise<void> {
       
   
    await this.getAllActivities();``
    //this.initMap();
    //Chargez les activités depuis le service avant de créer la carte
    // this.activityService.getAllActivities().subscribe((activities: ActivityModel[]) => {
    //   this.listActivities = activities;
    //   this.initMap(); // Initialiser la carte après avoir chargé les activités
    // });
  }

  ngAfterViewInit(): void {
    this.initMap();
    //throw new Error('Method not implemented.');
    //Loop through the activity list to add markers
    this.listActivities.forEach(activity => {
      //this.addMarker(activity.activityName, activity.posLat, activity.posLong);
    });
  
  }

  private initMap() {
    //Initializing the map and setting the initial position
    this.map = L.map('map').setView([50.82788, 4.37218], 13);
    //Configuring the OpenStreetMap tile layer
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);  

    //Adding markers for each activity
    // this.listActivities.forEach(activity => {
    //   this.addMarker(activity.activity_Id, activity.posLat, activity.posLong);
    // });
  }


  //Method to add markers on the map if necessary
  // private addMarker(latitude: number, longitude: number, popupText: string): void {
  //   //L.marker([latitude, longitude]).addTo(this.map)
  //   const lat = parseFloat(latitude);
  //   const long = parseFloat(longitude);
  //   if (!isNaN(lat) && !isNaN(long)) {
  //     const marker = L.marker([lat, long]).addTo(this.map)
  //     .bindPopup(`<b>${name}</b>`)
  //     .openPopup();
  //     this.markers.push(marker);
  //   }

      
  // }
  

  private addOrUpdateMarker(activity: ActivityModel): void {
    // Find existing marker
    let existingMarker = this.markers.find(marker => marker.options.title === activity.activityName);

    if (existingMarker) {
      existingMarker.setLatLng([activity.posLat, activity.posLong]);
      existingMarker.bindPopup('<b>${activity.activityName}</b><br />${activity.activityDescription}').openPopup();
    } else {
      // Create new marker
      let newMarker = L.marker([activity.posLat, activity.posLong], { title: activity.activityName });
      newMarker.bindPopup('<b>${activity.activityName}</b><br />${activity.activityDescription}');
      newMarker.addTo(this.map);
      this.markers.push(newMarker);
    }
  }

  public async getAllActivities(): Promise<void> {
    try {
      this.listActivities = await this.activityService.getAllActivities();

      // //Initialize properties if they are not already present
      // this.listActivities.forEach(activity => {
      //   activity.upVotes = activity.upVotes || 0;
      //   activity.downVotes = activity.downVotes || 0;
      //   activity.positiveFeedback = activity.positiveFeedback || 0;
      // });

      // this.listActivities.forEach(activity => {
      //   if (activity.upVotes === undefined) {
      //     console.error("Activity missing upVotes", activity);
      //   }
      //   if (activity.downVotes === undefined) {
      //     console.error("Activity missing downVotes", activity);
      //   }
      //   if (activity.positiveFeedback === undefined) {
      //     console.error("Activity missing positiveFeedback:", activity);
      //   }
      // });

      console.log('List of activities:', this.listActivities);

    } catch (error) {
      console.error('Error fetching activities:', error);
      alert('Failed to fetch activities. Please try again later.');
    }
  }

  // // Method to calculate column height based on votes/comments
  // public getBarHeight(votes: number): number {
  //   const maxHeight = 100;  //Maximum height in pixels
  //   const scale = 10;  //Scale factor to adjust height
  //   //Limit the height to maxHeight to avoid columns that are too tall
  //   return Math.min(votes * scale, maxHeight);
  //   return votes * 10; //Adjust this value according to the size of your bar
  // }

  // //Method for determining the color of the bars
  // public getBarColor(votes: number, isUpvote: boolean): string {
  //   if (isUpvote) {
  //     //The higher the votes for, the darker the color
  //     return `rgb(0, ${Math.min(255, votes * 10)}, 0)`;
  //   } else {
  //     //The higher the downvotes, the darker the color
  //     return `rgb(${Math.min(255, votes * 10)}, 0, 0)`;
  //   }
  //   return isUpvote ? 'chartreuse' : 'red'; //Vert pour les votes positifs, rouge pour les négatifs
  // }

  // //Method to calculate the color of positive reviews
  // public getFeedbackColor(feedback: number): string {
  //   //The higher the positive reviews, the darker blue the color
  //   return `rgb(0, 0, ${Math.min(255, feedback * 10)})`;
  //   return feedback > 50 ? 'ligthblue' : 'darkgrey'; //Blue for high positive reviews
  // }


  public async submit(activityForm: NgForm): Promise<void> {
    // Validation via le formulaire
    if (activityForm.invalid) {
      console.log("Form is invalid");
      return;
    }

    // Validation supplémentaire pour la latitude
    const latPattern = /^-?\d+\.\d{1,6}$/;
    const longPattern = latPattern;
    // if (!latPattern.test(this.posLat) || !longPattern.test(this.posLat)) {
    //   console.log("Must be a decimal with up to 5 digits after the decimal point");
    //   return;
    // }

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

        const response: ActivityModel = await this.activityService.createActivity(activityEdited);

        this.listActivities.filter((a: ActivityModel) => a.activity_Id != response.activity_Id);

        this.listActivities.push(response);

        // activityForm.resetForm();

        // this.cancelForm();

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
    if (confirm('Are you sure you want to delete this activity?')){
      try {
        this.listActivities = this.listActivities.filter(a => a.activity_Id !== activity_Id);
        console.log('Activity with ID ${activity_Id} has been deleted');
      } catch (error) {
        console.log("Error deleting activity:", error);
      }
    }
  }

  // public async updateActivity(activityForm: NgForm): Promise<void> {
  //   if (activityForm.invalid) {
  //     console.log('Form is invalid');
  //     return;
  //   }

  //   const activityUpdated: ActivityEditionModel = {
  //     activity_Id: this.activityToEdit.activity_Id,
  //     activityName: this.activityName,
  //     activityAddress: this.activityAddress, 
  //     activityDescription: this.activityDescription,
  //     complementareInformation: this.complementareInformation,
  //     posLat: this.posLat,
  //     posLong: this.posLong,
  //     organisateur_Id: this.organisateur_Id,
  //   };

  //   try {
  //     const updatedActivity = await this.activityService.updateActivity(activityUpdated);
  //     //Update the list with the updated activity
  //     const index = this.listActivities.findIndex(a => a.activity_Id === updatedActivity.activity_Id);
  //     if (index !== -1) {
  //       this.listActivities[index] = updatedActivity;
  //     }
  //     console.log('Activity updated:', updatedActivity);
  //     activityForm.resetForm();
  //     this.cancelForm();
  //     alert('Activity updated susseccfully');
  //   } catch (error) {
  //     console.error('Error updating activity:', error);
  //     alert('Failed to update activity. Please try again');
  //   }
  // }
  public async updateActivity(activityUpdated: ActivityEditionModel): Promise<void> {
    const url: string = `${CONST_API.URL_API}/Activity/update`;
    //Checking required fields
    if (!activityUpdated.activity_Id ||  !activityUpdated.activityName || !activityUpdated.activityAddress) {
      console.log('Missing required fields for activity update');
      return;
    }
    try {
      // const response: ActivityModel = await firstValueFrom(
      //   this.http.put<ActivityModel>(url, activityUpdated, {ResponseType: 'json'})
      // );
      // // Finding the activity to update in the list
      // const index = this.listActivities.findIndex((a) => a.activity_Id === response.activity_Id);
      // if (index !== -1) {
      //   this.listActivities[index] = response; //Updates existing activity
      // } else {
      //   this.listActivities.push(response);
      // }

      // console.log("Successful activity update:", response);

    } catch (error) {
      console.error("Error updating activity:", error);
    }
  }
}




