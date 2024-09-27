import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NEvenementModel } from 'src/app/models/nevenement/nevenement.model';
import { NEvenementCreationModel } from 'src/app/models/nevenement/nevenementCreation.model';
import { NEvenementEditionModel } from 'src/app/models/nevenement/nevenementEdition.model';
import { NevenementService } from 'src/app/services/nevenement.service';
import * as L from 'leaflet';
//import { error } from 'console';

export type MarkerFactory = { values: any[], markerFn: Function, popupFn?: Function}

@Component({
  selector: 'app-nevenement',
  templateUrl: './nevenement.component.html',
  styleUrl: './nevenement.component.css'
})
export class NevenementComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  private markers: L.Marker[] = [];
  listNEvenements: NEvenementModel[] = [];

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

  showForm: boolean;
  isFormEdition: boolean;
  nEvenementToEdit: NEvenementModel;

  displayedColumns: string[] = ['nEvenementDate', 'nEvenementName', 'nEvenementDescription', 'posLat', 'posLong', 'positif', 'organisateur_Id', 'nIcon_Id', 'recompense_Id', 'bonus_Id', 'mediaItem_Id']

  constructor(private nevenementService: NevenementService) {}

  ngAfterViewInit(): void {
    this.initMap();
    //throw new Error('Method not implemented.');
  }
  private initMap(): void {
    this.map = L.map('map', {
      center: [50.82788, 4.37218],
      zoom: 13
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);
  }

  // private addOrUpdateMarker(nevenement: NEvenementModel): void {
  //   //Find existing marker
  //   let existingMarker = this.markers.find(marker => marker.options.title ===nevenement.nEvenementName);

  //   if (existingMarker) {
  //     existingMarker.setLatLng([nevenement.posLat, nevenement.posLong]);
  //     existingMarker.bindPopup('<b>$${nevenement.nEvenementName}</b><br />${nEvenement.nEvenementDescription}').openPopup();
  //   } else {
  //     //Create new marker
  //     let newMarker = L.marker([nevenement.posLat, nevenement.posLong], { title: nevenement.nEvenementName })
  //     newMarker.bindPopup('<b>${nevenement.nEvenementName}</b><br />${nevenement.nEvenementDescription}');
  //     newMarker.addTo(this.map);
  //     this.markers.push(newMarker);
  //   } 
  // }


  public async ngOnInit(): Promise<void> {
    await this.getAllNEvenements();
  }
  public async getAllNEvenements(): Promise<void> {
    try {
      this.listNEvenements = await this.nevenementService.getAllNEvenements();

      console.log(this.listNEvenements);

    } catch (error) {
      console.log("Error list nevenements");
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
    if (!latPattern.test(this.posLat) || !longPattern.test(this.posLat)) {
      console.log("Must be a decimal with up to 5 digits after the decimal point");
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
        const response: NEvenementModel = await this.nevenementService.createNEvenement(nevenementEdited);

        this.listNEvenements.filter((e: NEvenementModel) => e.nEvenement_Id != response.nEvenement_Id);

        this.listNEvenements.push(response);

      } catch (error) {
        console.log("Error update Event!");
      }
    }
    else {
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
}

