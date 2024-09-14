import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NUserModel } from 'src/app/models/nuser/nuser.model';
import { NUserCreationModel } from 'src/app/models/nuser/nuserCreation.model';
import { NuserService } from 'src/app/services/nuser.service';

@Component({
  selector: 'app-nuser',
  templateUrl: './nuser.component.html',
  styleUrl: './nuser.component.css'
})
export class NuserComponent implements OnInit {
  listNUsers: NUserModel[] = [];

  email! : string;
  pwd! : string;
  nPerson_Id! : number;
  role_Id! : string;
  avatar_Id! : number;
  point! : string;

  disable! : boolean;

  showForm: boolean;

  displayedColums: string[] = ['email', 'pwd', 'nPerson_Id', 'role_Id', 'avatar_Id', 'point']
displayedColumns: any;

  constructor(private nuserService: NuserService) {}

  public async ngOnInit(): Promise<void> {
    await this.getAllNUsers();

    this.listNUsers = [
      // "nUser_Id": 1,
      // "email": "albatorcorsairdel'espace@skynet.org",
      // "pwd": "XXXXXXXXXXXXXXXXXXXXXXXXXX",
      // "nPerson_Id": 1,
      // "role_Id": 1,
      // "avatar_Id": 1,
      // "point": "1000"
    ]
  }

  public async getAllNUsers(): Promise<void> {
    try {
      this.listNUsers = await this.nuserService['getAllNUsers']();
    } catch (error) {
      console.log("Error List Users");
    }
  }

  public async submit(nUserForm: NgForm): Promise<void> {
    if (nUserForm.invalid) {
      console.log("Formis invalid");
      return;
    }
    const nuser: NUserCreationModel = {
      email: this.email,
      pwd: this.pwd,
      nPerson_Id: this.nPerson_Id,
      role_Id: this.role_Id,
      avatar_Id: this.avatar_Id,
      point: this.point
    };

    console.log(nuser);

    try {
      const response: NUserModel = await this.nuserService.createNUser(nuser);
      this.listNUsers.push(response);
    } catch (error) {
      console.log("Error creating new user!");
    }

  }
}

