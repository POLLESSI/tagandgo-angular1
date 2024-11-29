import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MapModel } from 'src/app/models/map/map.model';
import { MapCreationModel } from 'src/app/models/map/mapCreation.model';
import { MapEditionModel } from 'src/app/models/map/mapEdition.model';
import { MapService } from 'src/app/services/map.service';
import * as L from 'leaflet';
import { marker } from 'leaflet';

export type MarkerFactory = { values: any[], markerFn: Function, popupFn?: Function }
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  private markers: L.Marker[] = [];
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
  ngAfterViewInit(): void {
    try {
      //Initialiser la map Leaflet
      this.map = L.map('map').setView([50.82788, 4.37218], 13);
      if (this.map) {
        const marker = L.marker([50.82788, 4.37218]).addTo(this.map);
        marker.bindPopup('Hello, Leaflet!').openPopup();
      } else {
        console.error('Cannot add marker: map is undefined');
      }

      if (!this.map) {
        console.error('Map initialization failed');
        return;
      }
      
      //Ajouter calque de tuile OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(this.map);

      console.log('Map initialized successfully')

      console.log('Map instance', this.map);
    } catch (error) {
      console.error('Error in ngAfterViewInit:', error);
    }
    
  }

  ngOnInit(): void {
    this.mapService.initMap('map');
    //await this.getAllMaps();
  }

  initMap(): void {
    const containerId = 'map';

    //Vérifiez si la carte existe déjà
    if (this.map) {
      this.map.remove(); //Supprime l'ancienne instance
    }

    //Initialisez une nouvelle carte
    this.map = L.map(containerId).setView([50.82790, 4.37240], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

    console.log('Map initialized successfully');
  }

  public mapContainerVisible = true;

  ngOnDestroy(): void {
    //Désactiver le containeur avant de détruire le composant
    this.mapContainerVisible = false;

    if (this.map) {
      this.map.remove(); //Supprimer la carte proprement
      this.map = null;
      console.log('Map instance destroyed');
    }
  }
  //Method to add markers on the map if necessary
  addMarker(latitude: number, longitude: number, popupText: string) {
    L.marker([latitude, longitude]).addTo(this.map)
      .bindPopup(popupText)
      .openPopup();
  }

  public async getAllMaps(): Promise<void> {
    try {
      this.listMaps = await this.mapService.getAllMaps();

      console.log(this.listMaps);

    }catch (error) {
      console.log("Error List Maps");
    }
  }

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

    }
    else {
      const map: MapCreationModel = {
        dateCreation: this.dateCreation,
        mapUrl: this.mapUrl,
        description: this.description
      };

      try {
        const response: MapModel = await this.mapService.createMap(map);
        this.listMaps.push(response);

      } catch (error) {
        console.log("Error creating map!");
      }
    }
  }
  
  public onEdition(map_Id: number): void {
    this.showForm = true;
    this.isFormEdition = true; 

    this.mapToEdit = this.listMaps.find((m: MapModel) => m.map_Id == map_Id);

    this.dateCreation = this.mapToEdit.dateCreation;
    this.mapUrl = this.mapToEdit.mapUrl;
    this.description = this.mapToEdit.description;
  }

  public onCancelForm(): void {
    this.showForm = false;
    this.isFormEdition = false;

    this.dateCreation = null;
    this.mapUrl = null;
    this.description = null;
  }
}

