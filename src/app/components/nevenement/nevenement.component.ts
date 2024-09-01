import { Component } from '@angular/core';
import { NEvenementModel } from 'src/app/models/nevenement.model';
import { NevenementService } from 'src/app/services/nevenement.service';
//import { error } from 'console';

@Component({
  selector: 'app-nevenement',
  templateUrl: './nevenement.component.html',
  styleUrl: './nevenement.component.css'
})
export class NevenementComponent {
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
  nEvenement_Id! : number;

  disable! : boolean;

  constructor(private nevenementService: NevenementService) {}

  async ngOnInit(): Promise<void> {
    await this.getAllNEvenements();
  }
  async getAllNEvenements(): Promise<void> {
    try {
      this.ListNEvenements = await this.nevenementService.getAllNEvenements();
    } catch (error) {
      console.log("Error list nevenements");
    }
  }
  submit(): void {
    const nevenement: NEvenementModel = {
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
      mediaItem_Id: this.mediaItem_Id,
      nEvenement_Id: this.nEvenement_Id
    };
  }
}

