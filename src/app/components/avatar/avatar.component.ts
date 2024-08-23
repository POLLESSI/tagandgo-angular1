import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import * as signalr from '@microsoft/signalr';
import { AvatarModel } from 'src/app/models/avatar.model';
import { AvatarService } from 'src/app/services/avatar.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent implements OnInit {
  listAvatars: AvatarModel[] = [];
  //listAvatar: Array<AvatarModel> [];

  avatarName! : string;
  avatarUrl! : string;
  description! : string;
  avatar_Id! : number;

  hubConnection! : signalr.HubConnection;

  disable! : boolean;

  constructor(private avatarService: AvatarService) {}

  async ngOnInit(): Promise<void> {
    await this.getAvatars();
  }

  async getAvatars(): Promise<void> {
    try {
      this.listAvatars = await this.avatarService.getAvatars();

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
    this.hubConnection.invoke("SubmitAvatar", avatar)
      .catch(err => console.error(err));
  }

}

// deleteAvatar(avatar_Id: number) {
//   this.hubConnection.invoke("DeleteAvatar", avatar_Id)
//     .catch(err => console.error(err));
// }
// getAllAvatar() {
//   this.hubConnection.invoke("GetAllAvatars")
//     .catch(err => console.error(err));
// }

// getAvatar(avatar_Id: number) {
//   this.hubConnection.invoke("GetAvatar", avatar_Id)
//     .then(avatar => console.log(avatar))
//     .catch(err => console.error(err));
// }

// this.hubConnection = new signalr.HubConnectionBuilder()
// .withUrl("https://localhost:7069/avatar")
// .build();

// this.hubConnection.on("receiveAvatar",
// (avatar : Avatar) => {
// this.ListAvatar.push(avatar);
// });

// // this.hubConnection.on("ReceiveAllAvatars", (avatars: Avatar[]) => {
// //   this.ListAvatar = avatars;
// // });

// // this.hubConnection.on("AvatarDeleted", (avatar_Id: number) => {
// //   this.ListAvatar = this.ListAvatar.filter(av => av.avatar_Id !== avatar_Id);
// // });

// this.hubConnection.start()
// .then(() => console.log("Connected Rigth !!!!"))
// .catch((error) => console.log(error))
