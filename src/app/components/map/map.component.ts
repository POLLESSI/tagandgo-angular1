import { AfterViewInit, Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MapModel } from 'src/app/models/map/map.model';
import { MapCreationModel } from 'src/app/models/map/mapCreation.model';
import { MapEditionModel } from 'src/app/models/map/mapEdition.model';
import { ActivityModel } from 'src/app/models/activity/activity.model';
import { NEvenementModel } from 'src/app/models/nevenement/nevenement.model';
import { MapService } from 'src/app/services/map.service';
import * as L from 'leaflet';
//export type MarkerFactory = { values: any[], markerFn: Function, popupFn?: Function }
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  
  //public map: L.Map | null = null;
  // private markers: L.LayerGroup = L.layerGroup();

  @Input() activities: ActivityModel[] = [];
  @Input() evenements: NEvenementModel[] = [];
  private map!: L.Map;

  listMaps: MapModel[] = [];

  dateCreation! : string;
  mapUrl! : string;
  description! : string;

  disable! : boolean;

  showForm: boolean;
  isFormEdition: boolean;
  mapToEdit: MapModel;

  displayedColumns: string[] = ['dateCreation', 'mapUrl', 'description']

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.initMap();
  }

  ngAfterViewInit(): void {
    this.loadMarkers();
    // this.initMap();
    // this.addMarker();
    // const containerId = 'map';
    // const mapOptions: L.MapOptions = {
    //   center: [50.82788, 4.37218],
    //   zoom: 13,
    //   maxZoom: 19,
    // };

    // // Initialisation de la carte via le service
    // this.mapService.initMap(containerId, mapOptions);

    // try {
    //   // Chargement des données des cartes
    //   this.mapService.getAllMaps()
    //   .then(() => {
    //     console.log('Maps loaded successfully.');
    //   })
    //   .catch((error) => {
    //     console.error('Error loading maps:', error);
    //   });
    // } catch (error) {
    //   console.error('Error during map initialization:', error);
    // }
  }
  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove(); //Supprimer la carte proprement
      this.map = null;
      console.log('Map instance destroyed');
    } 
  }

  private initMap(): void {
    const containerId = 'map';
    const mapOptions: L.MapOptions = {
      center: [50.82788, 4.37218],
      zoom: 13,
      maxZoom: 19,
    };

    // let container = document.getElementById(containerId) as HTMLElement & {_leaflet_id?: number };

    // if (!container) {
    //   console.error('Map container with ID "${containerId}" not found.');
    //   return;
    // }

    // if (container._leaflet_id) {
    //   console.warn('Existing Leaflet map detected. Reinitializing...');
    //   container.innerHTML = "" //Vide le contenu pour éviter les conflits.
    // }
    // //Vérifiez si la carte existe déjà
    // if (this.map) {
    //   console.warn('Map already initialized.');
    //   this.map.remove(); //Supprime l'ancienne instance
    //   this.map = null;
    // }

    //Initialisez une nouvelle carte
    this.map = L.map(containerId, mapOptions);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
  }

  private loadMarkers(): void {
    this.activities.forEach(activity => {
      //this.mapService.addMarker(this.map, activity.posLat, activity.posLong, activity.activityName);
    });
    this.evenements.forEach(evenement => {
      //this.mapService.addMarker(this.map, evenement.posLat, evenement.posLong, evenement.nEvenementName);
    });
  }

  //public mapContainerVisible = true;

  //Method to add markers on the map if necessary
  // private addMarker(): void {
  //     this.markers.clearLayers(); //Efface les anciens marqueurs
  
  //     this.activities.forEach(activity => {
  //       const marker = L.marker([parseFloat(activity.posLat), parseFloat(activity.posLong)])
  //         .bindPopup(`<b>${activity.activityName}</b><br>${activity.activityDescription}`);
  //       this.markers.addLayer(marker);
  //     });
  //     this.evenements.forEach(evenement => {
  //       const marker = L.marker([parseFloat(evenement.posLat), parseFloat(evenement.posLong)])
  //         .bindPopup(`<b>${evenement.nEvenementName}</b><br>${evenement.nEvenementDescription}`);
  //       this.markers.addLayer(marker);
  //     });
  //   }

  // public async getAllMaps(): Promise<void> {
  //   try {
  //     this.listMaps = await this.mapService.getAllMaps();

  //     console.log(this.listMaps);

  //   }catch (error) {
  //     console.log("Error List Maps");
  //   }
  // }

  public async submit(mapForm: NgForm): Promise<void> {
    if (mapForm.invalid) {
      console.log("Form is invalid");
      return;
    }

    if (this.isFormEdition) {
      const mapEdited: MapEditionModel = {
        map_Id: this.mapToEdit.map_Id,
        dateCreation: this.mapToEdit.dateCreation,
        mapUrl: this.mapToEdit.mapUrl,
        description: this.mapToEdit.description,
      };
      // Update map logic here
    }
    else {
      const map: MapCreationModel = {
        dateCreation: this.dateCreation,
        mapUrl: this.mapUrl,
        description: this.description
      };

      try {
        // const response: MapModel = await this.mapService.createMap(map);
        // this.listMaps.push(response);

      } catch (error) {
        console.log("Error creating map!");
      }
    }
  }
  
  public onEdition(map_Id: number): void {
    this.showForm = true;
    this.isFormEdition = true; 

    this.mapToEdit = this.listMaps.find((m: MapModel) => m.map_Id == map_Id)!;

    this.dateCreation = this.mapToEdit.dateCreation;
    this.mapUrl = this.mapToEdit.mapUrl;
    this.description = this.mapToEdit.description;
  }

  public onCancelForm(): void {
    this.showForm = false;
    this.isFormEdition = false;

    this.dateCreation = '';
    this.mapUrl = '';
    this.description = '';
  }
}

