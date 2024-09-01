import { Component, OnInit } from '@angular/core';
import { OrganisateurModel } from 'src/app/models/organisateur.model';
import { OrganisateurService } from 'src/app/services/organisateur.service';

@Component({
  selector: 'app-organisateur',
  templateUrl: './organisateur.component.html',
  styleUrl: './organisateur.component.css'
})
export class OrganisateurComponent implements OnInit {
  ListOrganisateurs: OrganisateurModel[] = [];

  companyName! : string;
  businessNumber! : string;
  nUser_Id! : number;
  point! : string;
  organisateur_Id! : number;

  disable! : boolean;

  constructor(private organisateurService: OrganisateurService) {}

  async ngOnInit(): Promise<void> {
    await this.getAllOrganisateurs();
  }

  async getAllOrganisateurs(): Promise<void> {
    try {
      this.ListOrganisateurs = await this.organisateurService.getAllOrganisateurs();
    } catch (error) {
      console.log("Error list Organisators");
    }
  }

  submit(): void {
    const organisateur: OrganisateurModel = {
      companyName: this.companyName,
      businessNumber: this.businessNumber,
      nUser_Id: this.nUser_Id,
      point: this.point,
      organisateur_Id: this.organisateur_Id
    };
  }
}

