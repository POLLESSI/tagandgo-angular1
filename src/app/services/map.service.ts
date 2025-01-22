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
import { NEvenementModel } from '../models/nevenement/nevenement.model';
import { NevenementService } from './nevenement.service';
import { ActivityService } from './activity.service';
// export interface MappableEntity {
//   posLat: string;
//   posLong: string;
//   activityName?: string; // Optionnel si non applicable
//   nEvenementName?: string; // Optionnel si non applicable
// }
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
  // mapService: any;
  // listMaps: any;
  // get currentMap(): L.Map | null {
  //   return this.map;
  // }
  // Initialiser la carte
  initMap(containerId: string, options: L.MapOptions): void {
    const container = document.getElementById(containerId) as HTMLElement & { _leaflet_id?: number}

    if (!container) {
      console.error(`Map container with ID "${containerId}" not found.`);
      return;
    }

    if (container._leaflet_id) {
      console.warn('Existing Leaflet map detected. Reinitializing...');
      container.innerHTML = '';
    }

    if (this.map) {
      console.warn('Map instance already exists.Removing the previous instance.');
      this.map.remove(); // Efface l'ancienne version si elle existe déjà.
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
      console.error(`Failed to initialize map: ${error}`);
    }
  }
  getMap(): L.Map | null {
    return this.map;
  }

  addMarker(lat: string, lng: string, popupText: string): void {
    if (this.map) {
      L.marker([parseFloat(lat), parseFloat(lng)])
        .addTo(this.map!)
        .bindPopup(popupText)
        .openPopup();
    }
  }

  addActivityMarkers(activities: ActivityModel[]): void {
    activities.forEach(activity => {
      this.addMarker(activity.posLat, activity.posLong, activity.activityName);
    });
  }

  addEventMarkers(events: NEvenementModel[]): void {
    events.forEach(event => {
      this.addMarker(event.posLat, event.posLong, event.nEvenementName);
    });
  }

  updateMarker(lat: string, lng: string, popupText: string): void {
    this.addMarker(lat, lng, popupText);
  }

  // Initialiser la carte
  
  // Ajout des marqueurs à la carte
  // addMarker(mapService: MapService, posLat: string, posLong: string, activityName: string, lat: number, lng: number, options?: L.MarkerOptions): L.Marker | null {
  //   if (!this.isMapInitialized()) {
  //     return null;
  //   }
  //   try {
  //     const marker = L.marker([lat, lng], options);
  //     marker.addTo(this.map!);
  //     return marker;
  //   } catch (error) {
  //     this.logError('Failed to add marker: ${error}');
  //     return null;
  //   };
  // }

//   updateMarker(activity: ActivityModel): void {
//     const marker = this.markers.get(activity.activity_Id);
//     if (marker) {
//       marker.setLatLng([parseFloat(activity.posLat), parseFloat(activity.posLong)]);
//       marker
//         .bindPopup(`<b>${activity.activityName}</b><br>${activity.activityDescription}`)
//         .openPopup();
//     } else {
//       this.addMarker(
//         parseFloat(activity.posLat),
//         parseFloat(activity.posLong),
//         {title: activity.activity_Id.toString() }
//       );
//     }
//   }
// }
}