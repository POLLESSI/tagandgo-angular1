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
import { NevenementService } from './nevenement.service';
import { ActivityService } from './activity.service';

export interface MappableEntity {
  posLat: string;
  posLong: string;
  activityName?: string; // Optionnel si non applicable
  nEvenementName?: string; // Optionnel si non applicable
}

@Injectable({
  providedIn: 'root'
})
export class MapService {
  // activities: any;
  // activityService: any;
  // evenements: any;
  // nevenementService: any;
  // mapService: any;
  public map: L.Map;
  private markers: Map<number, L.Marker> = new Map();

  getMap(): L.Map | null {
    return this.map || null;
  }

  destroyMap(): void {
    if (this.map) {
      this.map.remove();
      this.map = null;
      console.log('Map instance destroyed');
    }
  }

  public loadMarkers(entities: MappableEntity[]): void {
    entities.forEach(entity => {
      const name = entity.activityName || entity.nEvenementName || 'UnKnown';
      const lat = parseFloat(entity.posLat);
      const long = parseFloat(entity.posLong);
  
      if (!isNaN(lat) && !isNaN(long)) {
        const marker = L.marker([lat, long]).bindPopup(name);
        marker.addTo(this.map);
      }
    });
  }
  

  constructor(private http: HttpClient) { }

  initMap(containerId: string): void {

    const container = document.getElementById(containerId) as HTMLElement & {_leaflet_id?: number };

    if (!container) {
      console.error('Map container with ID "${containerId}" not found.');
      return;
    }

    if (container._leaflet_id) {
      console.warn('Existing Leaflet map detected. Reinitializing...');
      container.innerHTML = '';
    }

    // Vérifiez si la carte est déjà initialisée
    if (this.map) {
      console.warn('Map instance already exists. Removing the previous instance.');
      this.map.remove(); // Efface l'ancienne instance si elle existe déjà. 
      this.map = null;
    }

    this.map = L.map(containerId).setView([50.82790, 4.37240], 13); // Initialisation de la map.

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    console.log('Map initialized successfully.');
  }

  private async loadNEvenements(): Promise<void> {
    try {
      // this.evenements = await this.nevenementService.getAllNEvenements();
      // this.mapService.loadMarkers(this.evenements);
    } catch (error) {
      console.error('Erreur de chargement des événements :', error);
    }
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
