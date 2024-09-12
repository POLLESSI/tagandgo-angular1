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

  constructor(private avatarService: AvatarService) {}

  async ngOnInit(): Promise<void> {
    await this.getAllAvatars();
  }

  async getAllAvatars(): Promise<void> {
    try {
      this.listAvatars = await this.avatarService.getAllAvatars();

    } catch (error) {
      console.log("Error list avatars");
    }
  }

  public async submit(avatarForm: NgForm): Promise<void> {
    if (avatarForm.invalid) {
      console.log("Form is invalid");
      return;
    }

    const avatar: AvatarCreationModel = {
      avatarName: this.avatarName,
      avatarUrl: this.avatarUrl,
      description: this.description,
    };

    console.log(avatar);

    try {
      const response: AvatarModel = await this.avatarService.createAvatar(avatar);
      this.listAvatars.push(response);
    } catch (error) {
      console.log("Error creating avatar!");
    }

  }

}
