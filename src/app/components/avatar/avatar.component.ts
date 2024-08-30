import { Component, OnInit } from '@angular/core';
import { AvatarModel } from 'src/app/models/avatar.model';
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
  avatar_Id! : number;

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

  submit(): void {
    const avatar: AvatarModel = {
      avatarName: this.avatarName,
      avatarUrl: this.avatarUrl,
      description: this.description,
      avatar_Id: this.avatar_Id
    };

  }

}
