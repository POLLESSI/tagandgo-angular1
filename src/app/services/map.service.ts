import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { MapModel } from '../models/map.model';
import { CONST_API } from '../constants/api-constants';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  public async getAllMaps(): Promise<Array<MapModel>> {
    const url: string = `${CONST_API.URL_API}/Map`;

    try {
      const respons: any = await firstValueFrom(this.http.get(url, {responseType: 'json'}));

      return respons as Array<MapModel>
    } catch (error) {
      throw error;
    }
  }

  public async createMap(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }

  public async updateMap(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }

  public async deleteMap(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }
}
