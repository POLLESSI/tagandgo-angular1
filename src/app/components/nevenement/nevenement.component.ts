import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NEvenementModel } from 'src/app/models/nevenement/nevenement.model';
import { NEvenementCreationModel } from 'src/app/models/nevenement/nevenementCreation.model';
import { NEvenementEditionModel } from 'src/app/models/nevenement/nevenementEdition.model';
import { NevenementService } from 'src/app/services/nevenement.service';
import * as L from 'leaflet';
import { NEvenementSyncService } from '../../services/nevenementsync.service';
import { SignalRService } from 'src/app/services/signalr.service';
import * as signalR from '@microsoft/signalr';
import { firstValueFrom } from 'rxjs';

export type MarkerFactory = { values: any[], markerFn: Function, popupFn?: Function}

@Component({
  selector: 'app-nevenement',
  templateUrl: './nevenement.component.html',
  styleUrl: './nevenement.component.css'
})
export class NevenementComponent implements OnInit, AfterViewInit, OnDestroy {
  private map!: L.Map;
  private markers: L.Marker[] = [];

  listNEvenements: NEvenementModel[] = [];

  nEvenement_Id! : number;
  nEvenementDate! : string;
  nEvenementName! : string;
  nEvenementDescription! : string;
  posLat! : number;
  posLong! : number;
  positif! : boolean;
  organisateur_Id! : number;
  nIcon_Id! : number;
  recompense_Id! : number;
  bonus_Id! : number;
  mediaItem_Id! : number;

  disable! : boolean;

  showForm: boolean;
  isFormEdition: boolean;
  nEvenementToEdit: NEvenementModel;

  displayedColumns: string[] = [
    'nEvenement_id',
    'nEvenementDate', 
    'nEvenementName', 
    'nEvenementDescription', 
    'posLat', 
    'posLong', 
    'positif', 
    'organisateur_Id', 
    'nIcon_Id', 
    'recompense_Id', 
    'bonus_Id', 
    'mediaItem_Id'
  ];

  constructor(
    private nevenementService: NevenementService,
    private nevenementSyncService: NEvenementSyncService,
    private signalRService: SignalRService
  ) {}

  ngAfterViewInit(): void {
    this.initMap();
    //throw new Error('Method not implemented.');
    this.listNEvenements.forEach(nevenement => {
      //this.addMarker(nevenement.nEvenementName, nevenement.posLat, nevenement.posLong );
    });
  }

  public async ngOnInit(): Promise<void> {
    await this.getAllNEvenements();
    this.initMap();
    this.loadData();
    this.nevenementSyncService.nEvenements$.subscribe(events => {
      this.listNEvenements = events; // Syncronise la liste locale
    });

    //Chargement des éléments depuis l'API au démarrage
    const events = await this.nevenementService.getAllNEvenements();
    this.nevenementSyncService.setNEvenements(events);
  }
  public async loadData() {
    try {
      const data = await firstValueFrom(this.nevenementService.getData());
      this.nEvenementName = data || null;
    } catch (error) {
      console.error('Error while retrieving data:', error);
    }
  }

  private initMap(): void {
    const containerId = 'map';

    //Vérifier si la carte existe déjà
    if (this.map) {
      this.map.remove();
    }

    //Initialiser une nouvelle carte
    this.map = L.map('nevenement-map').setView([50.82790, 4.37240], 13);

    //Configuring the OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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
  
  private addOrUpdateMarker(nevenement: NEvenementModel): void {
    //Find existing marker
    let existingMarker = this.markers.find(marker => marker.options.title ===nevenement.nEvenementName);

    if (existingMarker) {
      existingMarker.setLatLng([nevenement.posLat, nevenement.posLong]);
      existingMarker.bindPopup('<b>$${nevenement.nEvenementName}</b><br />${nEvenement.nEvenementDescription}').openPopup();
    } else {
      //Create new marker
      let newMarker = L.marker([nevenement.posLat, nevenement.posLong], { title: nevenement.nEvenementName })
      newMarker.bindPopup('<b>${nevenement.nEvenementName}</b><br />${nevenement.nEvenementDescription}');
      newMarker.addTo(this.map);
      this.markers.push(newMarker);
    }
  }

  public async getAllNEvenements(): Promise<void> {
    try {
      this.listNEvenements = await this.nevenementService.getAllNEvenements();

      console.log('List if events', this.listNEvenements);

    } catch (error) {
      console.log('Error fetching events:', error);
      alert('Failed to fetch events. Please try again later.');
    }
  }

  public async submit(nevenementForm: NgForm): Promise<void> {
    if (nevenementForm.invalid) {
      console.log("Form is invalid");
      return;
    }

    // Validation for latitude
    const latPattern = /^-?\d+\.\d{5}$/;
    const longPattern = latPattern;
    // if (!latPattern.test(this.posLat) || !longPattern.test(this.posLat)) {
    //   console.log("Must be a decimal with up to 5 digits after the decimal point");
    //   return;
    // }

    if (this.isFormEdition) {
      const nevenementEdited: NEvenementEditionModel = {
        nEvenement_Id: this.nEvenementToEdit.nEvenement_Id,
        nEvenementDate: this.nEvenementToEdit.nEvenementDate,
        nEvenementName: this.nEvenementToEdit.nEvenementName,
        nEvenementDescription: this.nEvenementToEdit.nEvenementDescription,
        posLat: this.nEvenementToEdit.posLat,
        posLong: this.nEvenementToEdit.posLong,
        positif: this.nEvenementToEdit.positif,
        organisateur_Id: this.nEvenementToEdit.organisateur_Id,
        nIcon_Id: this.nEvenementToEdit.nIcon_Id,
        recompense_Id: this.nEvenementToEdit.recompense_Id,
        bonus_Id: this.nEvenementToEdit.bonus_Id,
        mediaItem_Id: this.nEvenementToEdit.mediaItem_Id,
      };
      try {
        console.log("Event to edit:", nevenementEdited);
        const response: NEvenementModel = await this.nevenementService.createNEvenement(nevenementEdited);
        if (this.isFormEdition) {
          const updatedNEvenement = { ...this.nEvenementToEdit };
          await this.nevenementService.updateNEvenement(updatedNEvenement);
          this.nevenementSyncService.addOrUpdateNEvenement(updatedNEvenement); // Mise à jour du service
          this.signalRService.emitEventUpdate(updatedNEvenement); // Notifie SignalR
        } else {
          const newNEvenement = {
            nEvenementDate: this.nEvenementDate,
            nEvenementName: this.nEvenementName,
            nEvenementDescription: this.nEvenementDescription,
            posLat: this.posLat,
            posLong: this.posLong,
            positif: this.positif,
            organisateur_Id: this.organisateur_Id,
            nIcon_Id: this.nIcon_Id,
            recompense_Id: this.recompense_Id,
            bonus_Id: this.bonus_Id,
            mediaItem_Id: this.mediaItem_Id
          };
          const response = await this.nevenementService.createNEvenement(newNEvenement);
          this.nevenementSyncService.addOrUpdateNEvenement(response);
          this.signalRService.emitEventUpdate(response);
        }
        
        this.listNEvenements.filter((e: NEvenementModel) => e.nEvenement_Id != response.nEvenement_Id);

        this.listNEvenements.push(response);

        // activityForm.resetForm();
        this.onCancelForm();

      } catch (error) {
        console.log("Error update Event!", error);
      }
    }
    else {
      console.log("ICI");

      const nevenement: NEvenementCreationModel = {
        nEvenementDate: this.nEvenementDate,
        nEvenementName: this.nEvenementName,
        nEvenementDescription: this.nEvenementDescription,
        posLat: this.posLat,
        posLong: this.posLong,
        positif: this.positif,
        organisateur_Id: this.organisateur_Id,
        nIcon_Id: this.nIcon_Id,
        recompense_Id: this.recompense_Id,
        bonus_Id: this.bonus_Id,
        mediaItem_Id: this.mediaItem_Id
      };

      try {
        const response: NEvenementModel = await this.nevenementService.createNEvenement(nevenement);
        this.listNEvenements.push(response);

      } catch (error) {
        console.log("Error creating Event!")
      }
    }
  }
  public onEdition(nEvenement_Id: number): void {
    this.showForm = true;
    this.isFormEdition = true;

    this.nEvenementToEdit = this.listNEvenements.find((e: NEvenementModel) => e.nEvenement_Id == nEvenement_Id);

    this.nEvenementDate = this.nEvenementToEdit.nEvenementDate;
    this.nEvenementName = this.nEvenementToEdit.nEvenementName;
    this.nEvenementDescription = this.nEvenementToEdit.nEvenementDescription;
    this.posLat = this.nEvenementToEdit.posLat;
    this.posLong = this.nEvenementToEdit.posLong;
    this.positif = this.nEvenementToEdit.positif;
    this.organisateur_Id = this.nEvenementToEdit.organisateur_Id;
    this.nIcon_Id = this.nEvenementToEdit.nIcon_Id;
    this.recompense_Id = this.nEvenementToEdit.recompense_Id;
    this.bonus_Id = this.nEvenementToEdit.bonus_Id;
    this.mediaItem_Id = this.nEvenementToEdit.mediaItem_Id;
  }
  public onCancelForm(): void {
    this.showForm = false;
    this.isFormEdition = false;

    this.nEvenementName = null;
    this.nEvenementName = null;
    this.nEvenementDescription = null;
    this.posLat = null;
    this.posLong = null;
    this.positif = null;
    this.organisateur_Id = null;
    this.nIcon_Id = null;
    this.recompense_Id = null;
    this.bonus_Id = null;
    this.mediaItem_Id = null;
  }
  public async deleteNEvenement(nEvenement_Id: number): Promise<void> {
    if (confirm('Are you sure you want to delete this event')){
      try {
        this.listNEvenements = this.listNEvenements.filter(a => a.nEvenement_Id !== nEvenement_Id);
        console.log('Event with ID ${nEvenement_Id} has been deleted');
      } catch (error) {
        console.log("Error deleting event:", error);
      }
    }
  }
}

