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
  private map: L.Map | null = null;
  mapService: any;
  listMaps: any;
  get currentMap(): L.Map | null {
    return this.map;
  }

  initMap(map: L.Map): void {
    this.map = map;
  }

  addMarker(map: L.Map, lat: string, lng: string, popupText: string): void {
    L.marker([parseFloat(lat), parseFloat(lng)]).addTo(map)
    .bindPopup(popupText)
    .openPopup();
  }

  updateMarker(map: L.Map, lat: string, lng: string, popupText: string): void {
    this.map = map;
    this.addMarker(map, lat, lng, popupText);
  }

  // public loadMarkers(entities: MappableEntity[]): void {
  //   entities.forEach(entity => {
  //     const name = entity.activityName || entity.nEvenementName || 'UnKnown';
  //     const lat = parseFloat(entity.posLat);
  //     const long = parseFloat(entity.posLong);
  
  //     if (!isNaN(lat) && !isNaN(long)) {
  //       const marker = L.marker([lat, long]).bindPopup(name);
  //       marker.addTo(this.map);
  //     }
  //   });
  // }
  

  constructor(private http: HttpClient) { }

  // Méthode utilitaire pour vérifier si la carte est initialisée
  private isMapInitialized(): boolean {
    if (!this.map) {
      console.error('map is not initialized.');
      return this.map !== null;
    }
    return true;
  }
  // Méthode utilitaire pour gérer les erreurs
  private logError(message: string): void {
    console.error(`[MapService Error]: ${message}`)
  }

  // Initialiser la carte
  initMap(containerId: string, options: L.MapOptions): void {
    const container = document.getElementById(containerId) as HTMLElement & {_leaflet_id?: number };

    if (!container) {
      console.error('Map container with ID "${containerId}" not found.');
      return;
    }

    if (container._leaflet_id) {
      console.warn('Existing Leaflet map detected. Reinitializing...');
      container.innerHTML = '';
    }

    if (this.map) {
      console.warn('Map instance already exists. Removing the previous instance.');
      this.map.remove(); // Efface l'ancienne instance si elle existe déjà. 
      this.map = null;
      return;
    }

    // Initialisez une nouvelle carte
    this.map = L.map(containerId, options).setView([50.82790, 4.37240], 13);

    try {
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(this.map);

      console.log('Map initialized successfully.');
    } catch (error) {
      console.error('Failed to initialized map: ${error}');
    }
  }

  private async loadNEvenements(): Promise<void> {
    try {
      // this.evenements = await this.nevenementService.getAllNEvenements();
      // this.mapService.loadMarkers(this.evenements);
    } catch (error) {
      console.error('Erreur de chargement des événements :', error);
    }
  }

  // Méthode pour charger les données des cartes
  public async getAllMaps(simulate: boolean = false): Promise<MapModel[]> {
    if (simulate) {
      // Simuler un appel API pour les tests.
      console.log('Using simulated data for maps.');
      return [];
    }

    const urlAPI: string = `${CONST_API.URL_API}/Map`;

    try {
      //Simulez un appel API ou chargez les cartes depuis une source de données
      const maps: MapModel[] = [];
      const response: any = await firstValueFrom(
        this.http.get<MapModel[]>(urlAPI, { responseType: 'json' })
      );
      return response as MapModel[];
    } catch (error) {
      console.error('Error fetching maps:', error);
      throw error;
    }
  }

  public async loadMaps(): Promise<void> {
    try {
      const maps = await this.mapService.getAllMaps();
      console.log('Maps loaded successfully:', maps);
      this.listMaps = maps;
    } catch (error) {
      console.error('Error loading maps:', error);
    }
  }

  // Détruire la map
  destroyMap(): void {
    if (!this.isMapInitialized()) {
      return;
    }
    if (this.map) {
      this.map?.remove();
      this.map = null;
      console.log('Map destroyed successfully.');
    }
  }

  // Ajout des marqueurs à la carte
  addMarker(mapService: MapService, posLat: string, posLong: string, activityName: string, lat: number, lng: number, options?: L.MarkerOptions): L.Marker | null {
    if (!this.isMapInitialized()) {
      return null;
    }
    try {
      const marker = L.marker([lat, lng], options);
      marker.addTo(this.map!);
      return marker;
    } catch (error) {
      this.logError('Failed to add marker: ${error}');
      return null;
    };
    
    // const marker = L.marker(
    //   [parseFloat(activity.posLat), parseFloat(activity.posLong)],
    //   { title: activity.activity_Id.toString() }
    // )
    //   .bindPopup(`<b>${activity.activityName}</b><br>${activity.activityDescription}`)
    //   .addTo(this.map);
    // this.markers.set(activity.activity_Id, marker);
  }

  // updateMarker(activity: any): void {
  //   if (!this.isMapInitialized()) return;
  // }

  updateMarker(activity: ActivityModel): void {
    const marker = this.markers.get(activity.activity_Id);
    if (marker) {
      marker.setLatLng([parseFloat(activity.posLat), parseFloat(activity.posLong)]);
      marker
        .bindPopup(`<b>${activity.activityName}</b><br>${activity.activityDescription}`)
        .openPopup();
    } else {
      this.addMarker(
        parseFloat(activity.posLat),
        parseFloat(activity.posLong),
        {title: activity.activity_Id.toString() }
      );
    }
  }

  removeMarker(activityId: number): void {
    const marker = this.markers.get(activityId);
    if (marker) {
      this.map.removeLayer(marker);
      this.markers.delete(activityId);
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
