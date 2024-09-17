import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AvatarModel } from 'src/app/models/avatar/avatar.model';
import { AvatarCreationModel } from 'src/app/models/avatar/avatarCreation.model';
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

  async ngOnInit(): Promise<void> {
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
    this.showForm = false;
    this.isFormEdition = false;

    this.avatarName = null;
    this.avatarUrl = null;
    this.description = null;
  }
}
