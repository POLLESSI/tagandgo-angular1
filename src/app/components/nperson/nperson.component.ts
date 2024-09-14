import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NPersonModel } from 'src/app/models/nperson/nperson.model';
import { NPersonCreationModel } from 'src/app/models/nperson/npersonCreation.model';
import { NpersonService } from 'src/app/services/nperson.service';
@Component({
  selector: 'app-nperson',
  templateUrl: './nperson.component.html',
  styleUrl: './nperson.component.css'
})
export class NpersonComponent implements OnInit {
  listNPersons: NPersonModel[] = [];

  lastname! : string;
  firstname! : string;
  email! : string;
  addess_Street! : string;
  address_Nbr! : string;
  postalCode! : string;
  address_City! : string;
  address_Country! : string;
  telephone! : string;
  gsm! : string;

  disable! : boolean;

  showForm: boolean;
  displayedColums: string[] = ['lastname', 'firstname', 'email', 'address_Street', 'address_Nbr', 'postalCode', 'address_City', 'address_Country', 'telephone', 'gsm']
displayedColumns: any;

  constructor(private npersonService: NpersonService) {}

  public async ngOnInit(): Promise<void> {
    await this.getAllNPersons();

    this.listNPersons = [
      // "nPerson_Id": 1,
      // "lastname": "CorsaireDeL'Espace",
      // "firstname": "Albator",
      // "email": "albatorcorsairdel'espace@skynet.org",
      // "address_Street": "Ceinture de Vanhaelen",
      // "address_Nbr": "1B",
      // "postalCode": "00000",
      // "address_City": "Orbite Basse",
      // "address_Country": "Planète Terre",
      // "telephone": "000/0000001",
      // "gsm": "0000/000001"
    ]
  }

  public async getAllNPersons(): Promise<void> {
    try {
      this.listNPersons = await this.npersonService.getAllNPersons();
    } catch (error) {
      console.log("Error list Persons");
    }
  }

  public async submit(nPersonForm: NgForm): Promise<void> {
    if (nPersonForm.invalid) {
      console.log("Form is invalid");
      return;
    }
    const nperson: NPersonCreationModel = {
      lastname: this.lastname,
      firstname: this.firstname,
      email: this.email,
      address_street: this.addess_Street,
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
    } catch (Error) {
      console.log("Error creating new person!");
    }
  }
}


