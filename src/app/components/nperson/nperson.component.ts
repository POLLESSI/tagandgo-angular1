import { Component, OnInit } from '@angular/core';
import { NPersonModel } from 'src/app/models/nperson.model';
import { NpersonService } from 'src/app/services/nperson.service';
@Component({
  selector: 'app-nperson',
  templateUrl: './nperson.component.html',
  styleUrl: './nperson.component.css'
})
export class NpersonComponent implements OnInit {
  ListNPersons: NPersonModel[] = [];

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
  NPerson_Id! : number;

  disable! : boolean;

  constructor(private npersonService: NpersonService) {}

  async ngOnInit(): Promise<void> {
    await this.getAllNPersons();
  }

  async getAllNPersons(): Promise<void> {
    try {
      this.ListNPersons = await this.npersonService.getAllNPersons();
    } catch (error) {
      console.log("Error list Persons");
    }
  }

  submit(): void {
    const nperson: NPersonModel = {
      lastname: this.lastname,
      firstname: this.firstname,
      email: this.email,
      address_street: this.addess_Street,
      address_Nbr: this.address_Nbr,
      postalCode: this.postalCode,
      address_City: this.address_City,
      address_Country: this.address_Country,
      telephone: this.telephone,
      gsm: this.gsm,
      NPerson_Id: this.NPerson_Id
    };
  }
}


