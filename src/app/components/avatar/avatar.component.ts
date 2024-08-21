import { Component } from '@angular/core';
import { Form } from '@angular/forms';
import * as signalr from '@microsoft/signalr';
// import { error } from 'console';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent {
  ListAvatar: Avatar[] = []

  avatarName! : string;
  avatarUrl! : string;
  description! : string;
  avatar_Id! : number;

  hubConnection! : signalr.HubConnection;

  disable! : boolean;

  //#avatarForm! : Form;
    ngOnInit(){
      this.hubConnection = new signalr.HubConnectionBuilder()
          .withUrl("https://localhost:7069/avatar")
          .build();

      this.hubConnection.on("receiveAvatar",
        (avatar : Avatar) => {
          this.ListAvatar.push(avatar);
        });
      
      // this.hubConnection.on("ReceiveAllAvatars", (avatars: Avatar[]) => {
      //   this.ListAvatar = avatars;
      // });

      // this.hubConnection.on("AvatarDeleted", (avatar_Id: number) => {
      //   this.ListAvatar = this.ListAvatar.filter(av => av.avatar_Id !== avatar_Id);
      // });

      this.hubConnection.start()
          .then(() => console.log("Connected Rigth !!!!"))
          .catch((error) => console.log(error))
    }
    

    submit() {
      const avatar: Avatar = {
        avatarName: this.avatarName,
        avatarUrl: this.avatarUrl,
        description: this.description,
        avatar_Id: this.avatar_Id
      };
      this.hubConnection.invoke("SubmitAvatar", avatar)
        .catch(err => console.error(err));
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
}

export interface Avatar {
  avatarName : string;
  avatarUrl : string;
  description : string;
  avatar_Id : number;
}
