import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalRService } from 'src/app/services/signalr.service';
import { NgForm } from '@angular/forms';
import { CONST_API } from 'src/app/constants/api-constants';
import { OrganisateurModel } from 'src/app/models/organisateur/organisateur.model';
import { OrganisateurCreationModel } from 'src/app/models/organisateur/organisateurCreation.model';
import { OrganisateurEditionModel } from 'src/app/models/organisateur/organisateurEdition.model';
import { OrganisateurService } from 'src/app/services/organisateur.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RoutesDefined } from 'src/app/constants/routes';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-organisateur',
  templateUrl: './organisateur.component.html',
  styleUrls: ['./organisateur.component.css'],
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
export class OrganisateurComponent implements OnInit {
  isLoading = false;

  listOrganisateurs: OrganisateurModel[] = [];

  companyName! : string;
  businessNumber! : string;
  nUser_Id! : number;
  point! : string;

  disable! : boolean;

  showForm: boolean;
  isFormEdition: boolean;
  organisateurToEdit: OrganisateurModel;

  displayedColumns: string[] = ['companyName', 'businessNumber', 'nUser_Id', "point"]

  constructor(
    private signalRService: SignalRService,
    private organisateurService: OrganisateurService
  ) {}

  public async ngOnInit(): Promise<void> {
    this.isLoading = true;

    console.log('Organisateur component initialized');

    await this.getAllOrganisateurs();
    if (this.organisateurService) {
      this.organisateurService.addListener((organisateurs: OrganisateurModel[]) => {
        console.log('Organisator received', organisateurs);
        this.isLoading = false;
      });

      // S'assurer que les appels API sont éffectués  
      try {
        const organisateurs = await this.organisateurService.getAllOrganisateurs();
        console.log('Organisators fetched from API', organisateurs);
      } catch (error) {
        console.error('Error fetching organisators', error);
      }
    }
  }

  public async getAllOrganisateurs(): Promise<void> {
    try {
      this.listOrganisateurs = await this.organisateurService.getAllOrganisateurs();

      console.log(this.listOrganisateurs);

    } catch (error) {
      console.log("Error list Organisators");
    }
  }
  public async submit(organisateurForm: NgForm): Promise<void> {
    if (organisateurForm.invalid) {
      console.log("Form is invalid");
      return;
    }

    if (this.isFormEdition) {
      const organisateurEdited: OrganisateurEditionModel = {
        organisateur_Id: this.organisateurToEdit.organisateur_Id,
        companyName: this.organisateurToEdit.companyName,
        businessNumber: this.organisateurToEdit.businessNumber,
        nUser_Id: this.organisateurToEdit.nUser_Id,
        point: this.organisateurToEdit.point,
        
      };
      try {
        const response: OrganisateurModel = await this.organisateurService.createOrganisateur(organisateurEdited);

        this.listOrganisateurs.filter((o: OrganisateurModel) => o.organisateur_Id != response.organisateur_Id);

        this.listOrganisateurs.push(response);

      } catch (error) {
        console.log("Error creating Organisateur!");
      }
    }
    else {
      const organisateur: OrganisateurCreationModel = {
        companyName: this.companyName,
        businessNumber: this.businessNumber,
        nUser_Id: this.nUser_Id,
        point: this.point
      };

      try {
        const response: OrganisateurModel = await this.organisateurService.createOrganisateur(organisateur);
        this.listOrganisateurs.push(response);
  
      } catch (error) {
        console.log("Error creating organisateur");
      }
    } 
  }

  public onEdition(organisateur_Id: number): void {
    this.showForm = true;
    this.isFormEdition = true;

    this.organisateurToEdit = this.listOrganisateurs.find((o: OrganisateurModel) => o.organisateur_Id == organisateur_Id);

    this.companyName = this.organisateurToEdit.companyName;
    this.businessNumber = this.organisateurToEdit.businessNumber;
    this.nUser_Id = this.organisateurToEdit.nUser_Id;
    this.point = this.organisateurToEdit.point;
  }
  
  public onCancelForm(): void {
    this.showForm = false;
    this.isFormEdition = false;

    this.companyName = null;
    this.businessNumber = null;
    this.nUser_Id = null;
    this.point = null;
  }
}

