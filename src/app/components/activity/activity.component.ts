import { Component, OnInit } from '@angular/core';
import { SignalRService } from 'src/app/services/signalr.service';
import { NgForm, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CONST_API } from 'src/app/constants/api-constants';
import { ActivityModel } from 'src/app/models/activity/activity.model'
import { ActivityCreationModel } from 'src/app/models/activity/activityCreation.model';
import { ActivityEditionModel } from 'src/app/models/activity/activityEdition.model';
import { ActivityService } from 'src/app/services/activity.service';
import * as L from 'leaflet';
import { MapService } from '../../services/map.service';

export type MarkerFactory = { values: any[], markerFn: Function, popupFn?: Function }

export function coordinateValidator(): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = /^-?\d+\.\d{1,6}$/.test(control.value);
    return valid ? null : {invalidCoordinate: true}
  }
}

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  [x: string]: any;
  activities: ActivityModel[] = [];
  isLoading = false;
  
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
  activityToEdit: ActivityModel | null = null;

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
  constructor(
    private signalRservice: SignalRService,
    private activityService: ActivityService,
    private mapService: MapService
  ) {}

  public async ngOnInit(): Promise<void> {
    this.isLoading = true;

    //Synchronisation avec SignalR
    this.signalRservice.startConnection();
    this.signalRservice.onActivityUpdate(this.handleActivityUpdate.bind(this));

    //Charger les activités depuis l'API
    await this.loadActivities();

    this.isLoading = false;
  }

  private async loadActivities(): Promise<void> {
    try {
      this.activities = await this.activityService.getAllActivities();
      this.mapService.loadMarkers(this.activities);
    } catch (err) {
      console.error('Error loading activities:', err);
    }
    const mockActivities: ActivityModel[] = [
      {
        activity_Id: 1, 
        activityName: 'Hiking', 
        activityAddress: '', 
        activityDescription: 'activity', 
        complementareInformation: '', 
        posLat: '48.858844', 
        posLong: '2.294351', 
        organisateur_Id: 1,
        upVotes: undefined,
        downVotes: undefined,
        positiveFeedback: 1
      },
      {
        activity_Id: 2,
        activityName: 'Cycling',
        activityAddress: '',
        activityDescription: '',
        posLat: '40.712776',
        posLong: '-74.005974',
        organisateur_Id: 2,
        complementareInformation: '',
        upVotes: undefined,
        downVotes: undefined,
        positiveFeedback: 0
      },
    ];

    this.activities = mockActivities;

    this.signalRservice.updateActivities(this.activities);
  }

  private handleActivityUpdate(updatedActivity: ActivityModel): void {
    const index = this.activities.findIndex(a => a.activity_Id === updatedActivity.activity_Id);
    if (index !== -1) {
      this.activities.push(updatedActivity);
    } else {
      this.activities.push(updatedActivity);
    }
    this.mapService.updateMarker(updatedActivity);
  }

  public async onActivitySubmit(activity: ActivityModel): Promise<void> {
    try {
      const savedActivity = await this.activityService.saveActivity(activity); // Sauvegarder l'activité
      this['signalRService'].sendActivityUpdate(savedActivity); // Notifier SignalR
    } catch (error) {
      console.error('Error saving activity:', error);
    }
  }

  public async updateActivityPosition(activityId: number, newLat: number, newLng: number): Promise<void> {
    try {
      // Update activity data
      const activity = this.activities.find(a => a.activity_Id === activityId);
      if (activity) {
        activity.posLat = newLat.toString();
        activity.posLong = newLng.toString();
        this.signalRservice.sendMarkerUpdate(activityId.toString(), { lat: newLat, lng: newLng });
      }
    } catch (err) {
      console.error('Error updating activity position:', err);
    }
  }

  // private updateMarkersBasedOnVotes(voteData: any): void {
  //   //Trouver l'activité associée au `nEvenement_Id` du vote
  //   const associatedActivity = this.listActivities.find(
  //     (activity) => activity.activity_Id === voteData.nEvenement_Id
  //   );

  //   if (associatedActivity) {
  //     // Exemple: mettre à jour le popup du marqueur
  //     const marker = this.markers.find(
  //       (m) => m.getPopup()?.getContent() === associatedActivity.activityName
  //     );

  //     if (marker) {
  //       marker
  //         .bindPopup(
  //           `<b>${associatedActivity.activityName}</b><br />Fun? ${
  //             voteData.funOrNot ? 'Yes' : 'No'
  //           }<br />Comment: ${voteData.comment}`
  //         )
  //         .openPopup();
  //     }
  //   }
  // }

  public async getAllActivities(): Promise<void> {
    try {
      const activities = await this.activityService.getAllActivities();
      //this.activitySyncService.setActivityList(activities); // Synchronisation
      console.log('Activities fetched and synced', activities);
      console.log('Activities loaded:', activities);
      
    } catch (error) {
      //this['errorMessage'] = 'Failed to load activities.'
      console.error('Error fetching activities:', error);
      alert('Unable to load activities. Check your internet connection or try again later.');
      //this.toastr.error('Error retrieving activities.', 'Error');
    }
  }

  // Method to calculate column height based on votes/comments
  public getBarHeight(votes: number): number {
    const maxHeight = 100;  //Maximum height in pixels
    const scale = 10;  //Scale factor to adjust height
    //Limit the height to maxHeight to avoid columns that are too tall
    return Math.min(votes * scale, maxHeight);
    return votes * 10; //Adjust this value according to the size of your bar
  }

  //Method for determining the color of the bars
  public getBarColor(votes: number, isUpvote: boolean): string {
    if (isUpvote) {
      //The higher the votes for, the darker the color
      return `rgb(0, ${Math.min(255, votes * 10)}, 0)`;
    } else {
      //The higher the downvotes, the darker the color
      return `rgb(${Math.min(255, votes * 10)}, 0, 0)`;
    }
    return isUpvote ? 'chartreuse' : 'red'; //Vert pour les votes positifs, rouge pour les négatifs
  }

  //Method to calculate the color of positive reviews
  public getFeedbackColor(feedback: number): string {
    //The higher the positive reviews, the darker blue the color
    return `rgb(0, 0, ${Math.min(255, feedback * 10)})`;
    return feedback > 50 ? 'ligthblue' : 'darkgrey'; //Blue for high positive reviews
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

        const response: ActivityModel = await this.activityService.createActivity(activityEdited);

        this.activities.filter((a: ActivityModel) => a.activity_Id != response.activity_Id);

        this.activities.push(response);

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
        console.log(this.activities);
        console.log(response);

        this.activities.push(response);

        activityForm.resetForm();

        this.cancelForm();

      } catch (error) {
        console.log("Error creating activity!");
      }
    }
  }
  public async createActivity(activity: any,activityForm: NgForm): Promise<void> {
    console.log('Creating activity:', activity);
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
      this.activities.push(response); //Update the list with the new activity
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

    this.activityToEdit = this.activities.find((a: ActivityModel) => a.activity_Id == activity_Id);

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
        this.activities = this.activities.filter(a => a.activity_Id !== activity_Id);
        console.log('Activity with ID ${activity_Id} has been deleted');
      } catch (error) {
        console.log("Error deleting activity:", error);
      }
    }
  }

  public async updateActivity(activity: any,activityUpdated: ActivityEditionModel): Promise<void> {
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