import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrganisateurModel } from 'src/app/models/organisateur/organisateur.model';
import { OrganisateurCreationModel } from 'src/app/models/organisateur/organisateurCreation.model';
import { OrganisateurService } from 'src/app/services/organisateur.service';

@Component({
  selector: 'app-organisateur',
  templateUrl: './organisateur.component.html',
  styleUrl: './organisateur.component.css'
})
export class OrganisateurComponent implements OnInit {
  listOrganisateurs: OrganisateurModel[] = [];

  companyName! : string;
  businessNumber! : string;
  nUser_Id! : number;
  point! : string;

  disable! : boolean;

  showForm: boolean;
  displayedColums: string[] = ['companyName', 'businessNumber', 'nUser_Id', "point"]
displayedColumns: any;

  constructor(private organisateurService: OrganisateurService) {}

  public async ngOnInit(): Promise<void> {
    await this.getAllOrganisateurs();

    this.listOrganisateurs = [
      // "organisateur_Id": 1,
      // "companyName": "Les Grands Malades d'Anderlecht",
      // "nUser_Id": 1,
      // "point": "1000"
    ]
  }

  public async getAllOrganisateurs(): Promise<void> {
    try {
      this.listOrganisateurs = await this.organisateurService.getAllOrganisateurs();
    } catch (error) {
      console.log("Error list Organisators");
    }
  }
  public async submit(organisateurForm: NgForm): Promise<void> {
    if (organisateurForm.invalid) {
      console.log("Form is invalid");
      return;
    }
    const organisateur: OrganisateurCreationModel = {
      companyName: this.companyName,
      businessNumber: this.businessNumber,
      nUser_Id: this.nUser_Id,
      point: this.point
    };

    console.log(organisateur);

    try {
      const response: OrganisateurModel = await this.organisateurService.createOrganisateur(organisateur);
      this.listOrganisateurs.push(response);
    } catch (error) {
      console.log("Error creating Organisateur!");
    }
  }
}

