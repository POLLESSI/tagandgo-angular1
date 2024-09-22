import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NUserModel } from 'src/app/models/nuser/nuser.model';
import { NUserCreationModel } from 'src/app/models/nuser/nuserCreation.model';
import { NUserEditionModel } from 'src/app/models/nuser/nuserEdition.model';
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
  pwdConfirm! : string;
  nPerson_Id! : number;
  role_Id! : string;
  avatar_Id! : number;
  point! : string;

  disable! : boolean;

  showForm: boolean;
  isFormEdition: boolean;
  nuserToEdit: NUserModel;

  displayedColumns: string[] = ['email', 'nPerson_Id', 'role_Id', 'avatar_Id', 'point']

  constructor(private nuserService: NuserService) {}

  public async ngOnInit(): Promise<void> {
    await this.getAllNUsers();
  }

  public async getAllNUsers(): Promise<void> {
    try {
      this.listNUsers = await this.nuserService.getAllNUsers();

      console.log(this.listNUsers);

    } catch (error) {
      console.log("Error List Users");
    }
  }

  public async submit(nUserForm: NgForm): Promise<void> {
    if (nUserForm.invalid) {
      console.log("Formis invalid");
      return;
    }
    if (this.isFormEdition) {
      const nuserEdited: NUserEditionModel = {
        nUser_Id: this.nuserToEdit.nUser_Id,
        email: this.nuserToEdit.email,
        pwd: this.nuserToEdit.pwd,
        nPerson_Id: this.nuserToEdit.nPerson_Id,
        role_Id: this.nuserToEdit.role_Id,
        avatar_Id: this.nuserToEdit.avatar_Id,
        point: this.nuserToEdit.point,
      };
      try {
        const response: NUserModel = await this.nuserService.createNUser(nuserEdited);

        this.listNUsers.filter((u: NUserModel) => u.nUser_Id != response.nUser_Id);

        this.listNUsers.push(response);

      } catch (error) {
        console.log("Error creating new user!");
      }
    }
    else {
      const nuser: NUserCreationModel = {
        email: this.email,
        pwd: this.pwd,
        nPerson_Id: this.nPerson_Id,
        role_Id: this.role_Id,
        avatar_Id: this.avatar_Id,
        point: this.point
      };
    }
  }

  public onEdition(nUser_Id: number): void {
    this.showForm = true;
    this.isFormEdition = true;

    this.nuserToEdit = this.listNUsers.find((u: NUserModel) => u.nUser_Id == nUser_Id);

    this.email = this.nuserToEdit.email;
    this.pwd = this.nuserToEdit.pwd;
    this.nPerson_Id = this.nuserToEdit.nPerson_Id;
    this.role_Id = this.nuserToEdit.role_Id;
    this.avatar_Id = this.nuserToEdit.avatar_Id;
    this.point = this.nuserToEdit.point;
  }

  public onCancelForm(): void {
    this.showForm = false;
    this.isFormEdition = false;

    this.email = null;
    this.pwd = null;
    this.nPerson_Id = null;
    this.role_Id = null;
    this.avatar_Id = null;
    this.point = null;
  }
}

