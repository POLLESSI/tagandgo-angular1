import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { MapModel } from '../models/map/map.model';
import { CONST_API } from '../constants/api-constants';
import { MapCreationModel } from '../models/map/mapCreation.model';
import { MapEditionModel } from '../models/map/mapEdition.model';
import { marker } from 'leaflet';
import { ActivityModel } from '../models/activity/activity.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map: L.Map;
  private markers: Map<number, L.Marker> = new Map();

  initMap(containerId: string): void {
    this.map = L.map(containerId).setView([50.82790, 4.37240], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    console.log('Map initialized.');
  }

  loadMarkers(activities: ActivityModel[]): void {
    activities.forEach(activity => this.addMarker(activity));
  }

  addMarker(activity: ActivityModel): void {
    const marker = L.marker(
      [parseFloat(activity.posLat), parseFloat(activity.posLong)],
      { title: activity.activity_Id.toString() }
    )
      .bindPopup(`<b>${activity.activityName}</b><br>${activity.activityDescription}`)
      .addTo(this.map);
    this.markers.set(activity.activity_Id, marker);
  }

  updateMarker(activity: ActivityModel): void {
    const marker = this.markers.get(activity.activity_Id);
    if (marker) {
      marker.setLatLng([parseFloat(activity.posLat), parseFloat(activity.posLong)]);
      marker
        .bindPopup(`<b>${activity.activityName}</b><br>${activity.activityDescription}`)
        .openPopup();
    } else {
      this.addMarker(activity);
    }
  }

  removeMarker(activityId: number): void {
    const marker = this.markers.get(activityId);
    if (marker) {
      this.map.removeLayer(marker);
      this.markers.delete(activityId);
    }
  }

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
