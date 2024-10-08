import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { MapModel } from '../models/map/map.model';
import { CONST_API } from '../constants/api-constants';
import { MapCreationModel } from '../models/map/mapCreation.model';
import { MapEditionModel } from '../models/map/mapEdition.model';

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

  public async createMap(mapCreated: MapCreationModel): Promise<MapModel> {
    const url: string = `${CONST_API.URL_API}/Map/create`;
    try {
      const response: any = await firstValueFrom(this.http.post(url, mapCreated, {responseType: 'json'}))

      return response as MapModel

    } catch (error) {
      throw error;
    }
  }

  public async updateMap(mapEdited: MapEditionModel): Promise<void> {
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
