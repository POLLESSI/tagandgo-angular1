import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalRService } from 'src/app/services/signalr.service';
import { NgForm } from '@angular/forms';
import { NPersonModel } from 'src/app/models/nperson/nperson.model';
import { NPersonCreationModel } from 'src/app/models/nperson/npersonCreation.model';
import { NPersonEditionModel } from 'src/app/models/nperson/npersonEdition.model';
import { NpersonService } from 'src/app/services/nperson.service';
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
  selector: 'app-nperson',
  // template: `<button (click)="emitEvent()">Emit Event</button>`,  
  templateUrl: './nperson.component.html',
  styleUrls: ['./nperson.component.css'],
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
export class NpersonComponent implements OnInit {
  isLoading = false;
  listNPersons: NPersonModel[] = [];

  lastname! : string;
  firstname! : string;
  email! : string;
  address_street! : string;
  address_Nbr! : string;
  postalCode! : string;
  address_City! : string;
  address_Country! : string;
  telephone! : string;
  gsm! : string;

  disable! : boolean;

  showForm: boolean;
  isFormEdition: boolean;
  npersonToEdit: NPersonModel;
  displayedColumns: string[] = ['lastname', 'firstname', 'email', 'address_street', 'address_Nbr', 'postalCode', 'address_City', 'address_Country', 'telephone', 'gsm']

  constructor(
    private signalRServoce: SignalRService,
    private npersonService: NpersonService
  ) {}

  public async ngOnInit(): Promise<void> {
    this.isLoading = true;

    console.log('Person component initialized');

    this.npersonService.addListener((nPersons: NPersonModel[]) => {
      console.log('Event received', nPersons);
    });

    // S'assurer que les appels API sont éffectués
    try {
      const nPersons = await this.npersonService.getAllNPersons();
      console.log('Persons fetched from API', nPersons);
    } catch (error) {
      console.error('Error fetching persons',error);
    }
    await this.getAllNPersons();
  }

  emitEvent(): void {
    const nPersons: NPersonModel[] = [{
      NPerson_Id: 1,
      lastname: '',
      firstname: '',
      email: '',
      address_street: '',
      address_Nbr: '',
      postalCode: '',
      address_City: '',
      address_Country: '',
      telephone: '',
      gsm: ''
    }];
    this.npersonService.emitEvent(nPersons);  
  }

  public async getAllNPersons(): Promise<void> {
    try {
      this.listNPersons = await this.npersonService.getAllNPersons();

      console.log("Error List Persons")

    } catch (error) {
      console.log("Error list Persons");
    }
  }

  public async submit(nPersonForm: NgForm): Promise<void> {
    if (nPersonForm.invalid) {
      console.log("Form is invalid");
      return;
    }

    if (this.isFormEdition) {
      const npersonEdited: NPersonEditionModel = {
        nPerson_Id: this.npersonToEdit.NPerson_Id,
        lastname: this.npersonToEdit.lastname,
        firstname: this.npersonToEdit.firstname,
        email: this.npersonToEdit.email,
        address_street: this.npersonToEdit.address_street,
        address_Nbr: this.npersonToEdit.address_Nbr,
        postalCode: this.npersonToEdit.postalCode,
        address_City: this.npersonToEdit.address_City,
        address_Country: this.npersonToEdit.address_Country,
        telephone: this.npersonToEdit.telephone,
        gsm: this.npersonToEdit.gsm,

      };
      try {
        const response: NPersonModel = await this.npersonService.createNPerson(npersonEdited);

        this.listNPersons.filter((p: NPersonModel) => p.NPerson_Id != response.NPerson_Id);

        this.listNPersons.push(response);

      } catch (Error) {
        console.log("Error creating new person!");
      }
    }
    else {
      const nperson: NPersonCreationModel = {
        lastname: this.lastname,
        firstname: this.firstname,
        email: this.email,
        address_street: this.address_street,
        address_Nbr: this.address_Nbr,
        postalCode: this.postalCode,
        address_City: this.address_City,
        address_Country: this.address_Country,
        telephone: this.telephone,
        gsm: this.gsm
      };
      try {
        const response: NPersonModel = await this.npersonService.createNPerson(nperson);
        this.listNPersons.push(response);

      } catch (error) {
        console.log("Error creating new person");
      }
    }
  }

  public onEdition(nPerson_Id: number): void {
    this.showForm = true;
    this.isFormEdition = true;

    this.npersonToEdit = this.listNPersons.find((p: NPersonModel) => p.NPerson_Id == nPerson_Id);

    this.lastname = this.npersonToEdit.lastname;
    this.firstname = this.npersonToEdit.firstname;
    this.email = this.npersonToEdit.email;
    this.address_street = this.npersonToEdit.address_street;
    this.address_Nbr = this.npersonToEdit.address_Nbr;
    this.postalCode = this.npersonToEdit.postalCode;
    this.address_City = this.npersonToEdit.address_City;
    this.address_Country = this.npersonToEdit.address_Country;
    this.telephone = this.npersonToEdit.telephone;
    this.gsm = this.npersonToEdit.gsm;
  }

  public onCancelForm(): void {
    this.showForm = false;
    this.isFormEdition = false;

    this.lastname = null;
    this.firstname = null;
    this.email = null;
    this.address_street = null;
    this.address_Nbr = null;
    this.postalCode = null;
    this.address_City = null;
    this.address_Country = null;
    this.telephone = null;
    this.gsm = null;
  }
}


