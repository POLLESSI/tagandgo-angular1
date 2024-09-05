import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ActivityModel } from '../models/activity/activity.model';
import { CONST_API } from '../constants/api-constants';
import { ActivityCreationModel } from '../models/activity/activityCreation.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

  public async getAllActivities(): Promise<Array<ActivityModel>> {
    const url: string = `${CONST_API.URL_API}/Activity`;

    try {
      const respons: any = await firstValueFrom(this.http.get(url, {responseType: 'json'}));

      return respons as Array<ActivityModel>

    } catch (error) {
      throw error;
    }
  }

  public async createActivity(activityCreated: ActivityCreationModel): Promise<ActivityModel> {
    const url: string = `${CONST_API.URL_API}/Activity/create`;

    try {
      const respons: any = await firstValueFrom(this.http.post(url, activityCreated,{responseType: 'json'}));

      return respons as ActivityModel

    } catch (error) {
      throw error;
    }
  }

  public async updateActivity(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }

  public async deleteActivity(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }
}
