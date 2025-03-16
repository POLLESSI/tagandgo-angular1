import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { CONST_API } from 'src/app/constants/api-constants';
import { NEvenementModel } from 'src/app/models/nevenement/nevenement.model';
import { NEvenementCreationModel } from 'src/app/models/nevenement/nevenementCreation.model';
import { NEvenementEditionModel } from 'src/app/models/nevenement/nevenementEdition.model';
import { NevenementService } from 'src/app/services/nevenement.service';
import { NEvenementSyncService } from '../../../services/nevenementsync.service';
import { SignalRService } from 'src/app/services/signalr.service';
import * as signalR from '@microsoft/signalr';
import { firstValueFrom } from 'rxjs';
import { MapService } from 'src/app/services/map.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RoutesDefined } from 'src/app/constants/routes';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import * as L from 'leaflet';

@Component({
  selector: 'app-nevenement',
  // template: `<button (click)="emitEvent()">Emit Event</button>`,
  templateUrl: './nevenement.component.html',
  styleUrls: ['./nevenement.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatSlideToggleModule, 
    MatButtonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class NevenementComponent implements OnInit, OnDestroy {
  evenements: NEvenementModel[] = [];
  isLoading = false;

  nEvenement_Id! : number;
  nEvenementDate! : string;
  nEvenementName! : string;
  nEvenementDescription! : string;
  posLat! : string;
  posLong! : string;
  positif! : boolean;
  organisateur_Id! : number;
  nIcon_Id! : number;
  recompense_Id! : number;
  bonus_Id! : number;
  mediaItem_Id! : number;

  disable! : boolean;

  showForm: boolean = false;
  isFormEdition: boolean = false;
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
    private signalRService: SignalRService,
    private mapService: MapService
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    //this.initMap();
    console.log('Event component initialized');  
    // Synchronisation avec SignalR
    this.signalRService.startConnection();
    //this.signalRService.onNEvenementUpdate(this.handleNEvenementUpdate.bind(this));

    // Charger les événements depuis l'API
    this.loadNEvenements();

    this.isLoading = false;
    this.nevenementService.addListener((data: NEvenementModel[]) => {
      console.log('Event received', data);
      this.isLoading = false;
    });
    // S'assurer que les appels API sont effectués
    try {
      const events = await this.nevenementService.getAllNEvenements();
      console.log('Events fetched from API', events);
    } catch (error) {
      console.error('Error fetching events', error);
    }
  }

  emitEvent(): void {
    const event: NEvenementModel[] = [{
      nEvenementDate: '',
      nEvenementName: '',
      nEvenementDescription: '',
      posLat: '',
      posLong: '',
      positif: false,
      organisateur_Id: 0,
      nIcon_Id: 0,
      recompense_Id: 0,
      bonus_Id: 0,
      mediaItem_Id: 0,
      nEvenement_Id: 0
    }];
    this.nevenementService.emitEvent(event);
  }

  ngOnDestroy(): void {
    this.signalRService.stopConnection();
    // //Désactiver le containeur avant de détruire le composant
    // this.mapContainerVisible = false;

    // if (this.map) {
    //   this.map.remove(); //Supprimer la carte proprement
    //   this.map = null;
    //   console.log('Map instance destroyed');
    // }
  }

  private initMap(): void {
    const mapOptions: L.MapOptions = {
      center: [50.82790, 4.37240],
      zoom: 13,
      maxZoom: 19,
    };
    this.mapService.initMap('map', mapOptions);
  }

  // private initSignalR(): void {
  //   this.signalRService.startConnection();
  //   this.signalRService.onNEvenementUpdate(this.handleNEvenementUpdate.bind(this));
  // }

  private async loadNEvenements(): Promise<void> {
    try {
      this.evenements = await this.nevenementService.getAllNEvenements();
      this.mapService.addEventMarkers(this.evenements);
    } catch (err) {
      console.error('Error loading events:', err);
    }
  }

  private handleNEvenementUpdate(updatedNEvenement: NEvenementModel): void {
    const index = this.evenements.findIndex(e => e.nEvenement_Id === updatedNEvenement.nEvenement_Id);
    if (index !== -1) {
      this.evenements[index] = updatedNEvenement;
    } else {
      this.evenements.push(updatedNEvenement);
    }
    //this.mapService.updateMarker(this.mapService.getMap(), updatedNEvenement.posLat, updatedNEvenement.posLong, updatedNEvenement.nEvenementName);
  }

  public async onNEvenementSubmit(evenement: NEvenementModel): Promise<void> {
    try {
      const savedNEvenement = await this.nevenementService.saveNEvenement(evenement);
      this.signalRService.sendNEvenementUpdate(savedNEvenement);
    } catch (error) {
      console.error('Error saving event:', error);
    }
  }

  public async loadData() {
    try {
      const data = await firstValueFrom(this.nevenementService.getData());
      this.nEvenementName = data || null;
    } catch (error) {
      console.error('Error while retrieving data:', error);
    }
  }

  public async submit(nevenementForm: NgForm): Promise<void> {
    if (nevenementForm.invalid) {
      console.log("Form is invalid");
      return;
    }

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
        const response: NEvenementModel = await this.nevenementService.createNEvenement(nevenementEdited)
        if (this.isFormEdition) {
          const updatedNEvenement = { ...this.nEvenementToEdit };
          this.nevenementSyncService.addOrUpdateNEvenement(updatedNEvenement);
          this.signalRService.emitEventUpdate(updatedNEvenement);
        } else {
          const newNEvenement = {
            nEvenementDate: this.nEvenementDate,
            nEvenementName: this.nEvenementName,
            nEvenementDescription: this.nEvenementDescription,
            posLat: this.posLat,
            posLong: this.posLong,
            organisateur_Id: this.organisateur_Id,
            nIcon_Id: this.nIcon_Id,
            recompense_Id: this.recompense_Id,
            bonus_Id: this.bonus_Id,
            mediaItem_Id: this.mediaItem_Id,
          }
        }

        this.evenements = this.evenements.filter((e: NEvenementModel) => e.nEvenement_Id != response.nEvenement_Id);
        this.evenements.push(response);
        this.onCancelForm();

      } catch (error) {
        console.log("Error update Event!", error);
      }
    } else {
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
      this.evenements.push(response);
      this.signalRService.sendNEvenementUpdate(response);
    } catch (error) {
      console.log("Error creating Event!", error);
    }
  }
}

public onEdition(nEvenement_Id: number): void {
this.showForm = true;
this.isFormEdition = true;

this.nEvenementToEdit = this.evenements.find((e: NEvenementModel) => e.nEvenement_Id == nEvenement_Id);

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

this.nEvenementDate = null;
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
    if (confirm('Are you sure you want to delete this events?')) {
      try {
        this.evenements = this.evenements.filter(a => a.nEvenement_Id !== nEvenement_Id);
        console.log(`Event with ID ${nEvenement_Id} has been deleted`);
      } catch (error) {
        console.log("Error deleting event:", error);
      }
    }
  }
}

