import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ActivityModel } from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private API_URL_BASE: string = "http://localhost:7069";
  constructor(private http: HttpClient) { }

  public async getAllActivities(): Promise<Array<ActivityModel>> {
    const url: string = `${this.API_URL_BASE}/activity`;

    try {
      const respons: any = await firstValueFrom(this.http.get(url, {responseType: 'json'}));

      return respons as Array<ActivityModel>
    } catch (error) {
      throw error;
    }
  }
  public async createActivity(): Promise<void> {
    try {

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
