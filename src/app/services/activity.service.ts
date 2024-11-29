import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ActivityModel } from '../models/activity/activity.model';
import { CONST_API } from '../constants/api-constants';
import { ActivityCreationModel } from '../models/activity/activityCreation.model';
import { ActivityEditionModel } from '../models/activity/activityEdition.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  //private baseUrl = 'https://localhost:7069/api/activities'
  

  constructor(private http: HttpClient) { }

  public async getAllActivities(): Promise<Array<ActivityModel>> {
    const url: string = `${CONST_API.URL_API}/Activity`;
    try {
      const respons: any = await firstValueFrom(this.http.get(url, {responseType: 'json'}));

      return respons as Array<ActivityModel>;

    } catch (error) {
      throw new error('Error getting activity : ${error}'); 
    }
  }

  public async createActivity(activityCreated: ActivityCreationModel): Promise<ActivityModel> {
    const url: string = `${CONST_API.URL_API}/Activity/create`;

    try {
      const respons: any = await firstValueFrom(this.http.post(url, activityCreated, {responseType: 'json'}));

      return respons as ActivityModel

    } catch (error) {
      throw error;
    }
  }

  public updateActivity(activityUpdated: ActivityEditionModel): Observable<ActivityEditionModel> {
    

    try {
      const url: string = `${CONST_API.URL_API}/Activity/update`;
      // const url = '${this.baseUrl}/${activityUpdated.activity_Id}';
      console.log("UPDATE : ", url, activityUpdated);

      return this.http.put<ActivityModel>(url, activityUpdated, { responseType: 'json'});

    } catch (error) {
      throw error;
    }
  }

  public async deleteActivity(activity_Id: number): Promise<void> {
    const url: string = `${CONST_API.URL_API}/Activity/delete/${activity_Id}`;

    try {
      await firstValueFrom(this.http.delete(url, {responseType: 'json'}));
      console.log(`Activity with ID ${activity_Id} deleted successfully`)
    } catch (error) {
      throw new Error('Error deleting activity: ${error}');
    }
  }

  public async saveActivity(activity: ActivityModel): Promise<ActivityModel> {
    try {
      if (activity.activity_Id) {
        return await this.http
          .put<ActivityModel>(`${CONST_API.URL_API}/Activity/update/${activity.activity_Id}`, activity)
          .toPromise();
      } else {
        return await this.http
          .post<ActivityModel>(CONST_API.URL_API, activity)
          .toPromise();
      }
    } catch (error) {
      console.error('Error saving activity', error);
      throw error;
    }
  }
}
function from(promise: Promise<ActivityModel[]>): Observable<ActivityModel[]> {
  throw new Error('Function not implemented.');
}

