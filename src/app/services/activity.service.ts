import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ActivityModel } from '../models/activity/activity.model';
import { CONST_API } from '../constants/api-constants';
import { ActivityCreationModel } from '../models/activity/activityCreation.model';
import { ActivityEditionModel } from '../models/activity/activityEdition.model';
import * as signalR from '@microsoft/signalr';
@Injectable({
  providedIn: 'root'
})

export class ActivityService {
  private apiUrl = 'https://localhost:7069/api/activities'; //URL API
  private hubConnection!: signalR.HubConnection;
  
  constructor(private http: HttpClient) { 
    this.startSignalRConnection();
  }

  private startSignalRConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7069/hub/activities')
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connection started.'))
      .catch(err => console.error('SignalR connection error:', err));

    this.registerHubEvents();
  }

  private registerHubEvents(): void {
    this.hubConnection.on('ActivityCreated', (activity: ActivityModel) => {
      console.log('New activity created :', activity);
    });

    this.hubConnection.on('ActivityUpdated', (activity: ActivityModel) => {
      console.log('Activity updated :', activity);
    });

    this.hubConnection.on('ActivityDeleted', (id: number) => {
      console.log('Activity deleted with ID : ${activity_Id}');
    })
  }

  public stopSignalRConnection(): void {
    this.hubConnection
      .stop()
      .then(() => console.log('SignalR connection stopped.'))
      .catch(err => console.error('Error stopping SignalR:', err));
  }

  public async getAllActivities(): Promise<Array<ActivityModel>> {
    //const url: string = `${this.apiUrl}/Activities`;
    try {
      const respons = await firstValueFrom(
        this.http.get<ActivityModel[]>(this.apiUrl , {responseType: 'json'})
      );

      return respons as Array<ActivityModel>;

    } catch (error) {
      console.error('Error loading activities:', error)
      throw new Error('Error getting activity : ${error}'); 
    }
    console.log('URL:', this.apiUrl);
    console.error('Caught error:')
  }

  public async createActivity(activityCreated: ActivityCreationModel): Promise<ActivityModel> {
    const url: string = `${this.apiUrl}/Activity/create`;

    try {
      const respons: any = await firstValueFrom(this.http.post(url, activityCreated, {responseType: 'json'}));

      return respons as ActivityModel

    } catch (error) {
      throw error;
    }
  }

  public updateActivity(activityUpdated: ActivityEditionModel): Observable<ActivityEditionModel> {
    

    try {
      console.log("UPDATE : ", this.apiUrl, activityUpdated);

      return this.http.put<ActivityModel>(this.apiUrl, activityUpdated, { responseType: 'json'});

    } catch (error) {
      throw error;
    }
  }

  public async saveActivity(activity: ActivityModel): Promise<ActivityModel> {
    const url = activity.activity_Id
      ? `${this.apiUrl}/${activity.activity_Id}` // Update
      : this.apiUrl; // Create

    return firstValueFrom(
        activity.activity_Id
          ? this.http.put<ActivityModel>(url, activity)
          : this.http.post<ActivityModel>(url, activity)
      );
  }
  public async deleteActivity(activity_Id: number): Promise<void> {
    const url: string = `${this.apiUrl}/${activity_Id}`;

    try {
      await firstValueFrom(this.http.delete(url, {responseType: 'json'}));
      console.log(`Activity with ID ${activity_Id} deleted successfully`)
    } catch (error) {
      console.error('Error deleting activity with ID ${activity_Id}:', error)
      throw new Error('Error deleting activity: ${error}');
    }
  }
}
function from(promise: Promise<ActivityModel[]>): Observable<ActivityModel[]> {
  throw new Error('Function not implemented.');
}

