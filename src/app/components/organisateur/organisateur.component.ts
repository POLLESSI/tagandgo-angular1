import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrganisateurModel } from 'src/app/models/organisateur/organisateur.model';
import { OrganisateurCreationModel } from 'src/app/models/organisateur/organisateurCreation.model';
import { OrganisateurEditionModel } from 'src/app/models/organisateur/organisateurEdition.model';
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
  isFormEdition: boolean;
  organisateurToEdit: OrganisateurModel;

  displayedColumns: string[] = ['companyName', 'businessNumber', 'nUser_Id', "point"]

  constructor(private organisateurService: OrganisateurService) {}

  public async ngOnInit(): Promise<void> {
    await this.getAllOrganisateurs();
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

