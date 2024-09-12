import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NEvenementModel } from 'src/app/models/nevenement/nevenement.model';
import { NEvenementCreationModel } from 'src/app/models/nevenement/nevenementCreation.model';
import { NevenementService } from 'src/app/services/nevenement.service';
//import { error } from 'console';

@Component({
  selector: 'app-nevenement',
  templateUrl: './nevenement.component.html',
  styleUrl: './nevenement.component.css'
})
export class NevenementComponent implements OnInit {
  ListNEvenements: NEvenementModel[] = []

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

  constructor(private nevenementService: NevenementService) {}

  public async ngOnInit(): Promise<void> {
    await this.getAllNEvenements();
  }
  public async getAllNEvenements(): Promise<void> {
    try {
      this.ListNEvenements = await this.nevenementService.getAllNEvenements();
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

    console.log(nevenement);

    try {
      const response: NEvenementModel = await this.nevenementService.createNEvenement(nevenement);
      this.ListNEvenements.push(response);
    } catch (error) {
      console.log("Error creating Event!");
    }
  }
}

