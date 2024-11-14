import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CONST_API } from 'src/app/constants/api-constants';
import { AvatarModel } from 'src/app/models/avatar/avatar.model';
import { AvatarCreationModel } from 'src/app/models/avatar/avatarCreation.model';
import { AvatarEditionModel } from 'src/app/models/avatar/avatarEdition.model';
import { AvatarService } from 'src/app/services/avatar.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent implements OnInit {

  listAvatars: AvatarModel[] = [];

  avatarName! : string;
  avatarUrl! : string;
  description! : string;

  disable! : boolean;

  showForm: boolean;
  isFormEdition: boolean;
  avatarToEdit: AvatarModel;

  displayedColumns: string[] = ['avatarName', 'avatarUrl', 'description'];

  constructor(private avatarService: AvatarService) {}
  ngAfterViewInit(): void{
    //this.initMap();
    //throw new Error('Method not implemented.')
  }
  public async ngOnInit(): Promise<void> {
    await this.getAllAvatars();
  }

  public async getAllAvatars(): Promise<void> {
    try {
      this.listAvatars = await this.avatarService.getAllAvatars();

      console.log(this.listAvatars);

    } catch (error) {
      console.log("Error list avatars");
    }
  }

  public async submit(avatarForm: NgForm): Promise<void> {
    if (avatarForm.invalid) {
      console.log("Form is invalid");
      return;
    }

    if (this.isFormEdition) {
      const avatar: AvatarCreationModel = {
        avatarName: this.avatarName,
        avatarUrl: this.avatarUrl,
        description: this.description,
      };
      try {
        const response: AvatarModel = await this.avatarService.createAvatar(avatar);

        this.listAvatars.filter((a: AvatarModel) => a.avatar_Id != response.avatar_Id);

        this.listAvatars.push(response);

      } catch (error) {
        console.log("Error update avatar!");
      }
    }
    else {
      const avatar: AvatarCreationModel = {
        avatarName: this.avatarName,
        avatarUrl: this.avatarUrl,
        description: this.description
      };

      try {
        const response: AvatarModel = await this.avatarService.createAvatar(avatar);
        this.listAvatars.push(response);

      } catch (error) {
        console.log("Error creating avatar!");
      }
    }
  }

  public onEdition(avatar_Id: number): void {
    this.showForm = true;
    this.isFormEdition = true;

    this.avatarToEdit = this.listAvatars.find((a: AvatarModel) => a.avatar_Id == avatar_Id);

    this.avatarName = this.avatarToEdit.avatarName;
    this.avatarUrl = this.avatarToEdit.avatarUrl;
    this.description = this.avatarToEdit.description;
  }

  public onCancelForm(): void {
    this.cancelForm();
    
  }
  public cancelForm(): void {
    this.showForm = false;
    this.isFormEdition = false;

    this.avatarName = null;
    this.avatarUrl = null;
    this.description = null;
  }
  public async deleteAvatar(avatar_Id: number): Promise<void> {
    if (confirm('Are you sure you want to delete this avatar?')){
      try {
        this.listAvatars = this.listAvatars.filter(av => av.avatar_Id !== avatar_Id);
        console.log('Avatar with ID ${avatar_Id} has been deleted');
      } catch (error) {
        console .log("Error deleting avatar:", error);
      }
    }
  }

  public async updateAvatar(avatarUpdated: AvatarEditionModel): Promise<void> {
    const url: string = `${CONST_API.URL_API}/Avatar/update`;
    // Checking required fields
    if (!avatarUpdated.avatar_Id || !avatarUpdated.avatarName || !avatarUpdated.avatarUrl || !avatarUpdated.description) {
      console.log('Missing required fields for avatar update');
      return;
    }
    try {
    
    } catch (error) {
      console.error("Error updating avatar:", error);
    }    
  } 
}
