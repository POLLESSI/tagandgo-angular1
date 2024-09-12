import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NUserModel } from 'src/app/models/nuser/nuser.model';
import { NUserCreationModel } from 'src/app/models/nuser/nuserCreationModel';
import { NuserService } from 'src/app/services/nuser.service';

@Component({
  selector: 'app-nuser',
  templateUrl: './nuser.component.html',
  styleUrl: './nuser.component.css'
})
export class NuserComponent implements OnInit {
  ListNUsers: NUserModel[] = [];

  email! : string;
  pwd! : string;
  nPerson_Id! : number;
  role_Id! : string;
  avatar_Id! : number;
  point! : string;

  disable! : boolean;

  constructor(private nuserService: NuserService) {}

  public async ngOnInit(): Promise<void> {
    await this.getAllNUsers();
  }

  public async getAllNUsers(): Promise<void> {
    try {
      this.ListNUsers = await this.nuserService['getAllNUsers']();
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
      // const response: NUserModel = await this.nuserService.createNUser(nuser);
      // this.ListNUsers.push(response);
    } catch (error) {
      console.log("Error creating new user!");
    }

  }
}

