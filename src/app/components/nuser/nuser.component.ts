import { Component, OnInit } from '@angular/core';
import { NUserModel } from 'src/app/models/nuser.model';
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
  nUser_Id! : number;

  disable! : boolean;

  constructor(private nuserService: NuserService) {}

  async ngOnInit(): Promise<void> {
    await this.getAllNUsers();
  }

  async getAllNUsers(): Promise<void> {
    try {
      this.ListNUsers = await this.nuserService['getAllNUsers']();
    } catch (error) {
      console.log("Error List Users");
    }
  }

  submit(): void {
    const nuser: NUserModel = {
      email: this.email,
      pwd: this.pwd,
      nPerson_Id: this.nPerson_Id,
      role_Id: this.role_Id,
      avatar_Id: this.avatar_Id,
      point: this.point,
      nUser_Id: this.nUser_Id
    };
  }
}

