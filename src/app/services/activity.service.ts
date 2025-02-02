import { Injectable } from '@angular/core';
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

  public async GetAllActivitiesNoneArchived(): Promise<Array<ActivityModel>> {
    const url: string = `${CONST_API.URL_API}/Activity/active`;
    try {
      const respons: any = await firstValueFrom(this.http.get(url, {responseType: 'json'}));

      return respons as Array<ActivityModel>;

    } catch (error) {
      throw new error('Error getting activity : ${error}');
    }
  }

  public async createActivity(activityCreated: ActivityCreationModel): Promise<ActivityModel> {
    const url: string = `${CONST_API.URL_API}/Activity`;

    try {
      const respons: any = await firstValueFrom(this.http.post(url, activityCreated, {responseType: 'json'}));

      return respons as ActivityModel

    } catch (error) {
      throw error;
    }
  }

  public async updateActivity(activityUpdated: ActivityEditionModel): Promise<ActivityModel> {
    const url: string = `${CONST_API.URL_API}/Activity`;

    try {
      const respons = await firstValueFrom(this.http.put<ActivityModel>(url, activityUpdated, { responseType: 'json'}));
      return respons as ActivityModel;

    } catch (error) {
      throw error;
    }
  }

  public async patchActivity(id: number): Promise<ActivityModel> {
    const url: string = `${CONST_API.URL_API}/Activity/patch/${id}`;

    console.log(url);


    try {
      const respons = await firstValueFrom(this.http.patch(url, {responseType: 'json'}));
      return respons as ActivityModel;

    } catch (error) {
      throw new Error('Error patching activity: ${error}');
    }
  }

  public async deleteActivity(id: number): Promise<void> {
    const url: string = `${CONST_API.URL_API}/Activity/${id}`;

    try {
      await firstValueFrom(this.http.delete(url, {responseType: 'json'}));
    } catch (error) {
      throw new Error('Error deleting activity: ${error}');
    }
  }
}
