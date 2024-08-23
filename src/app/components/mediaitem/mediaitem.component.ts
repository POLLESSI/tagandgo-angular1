import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import * as signalr from '@microsoft/signalr';
//import { error } from 'console';

@Component({
  selector: 'app-mediaitem',
  // standalone: true,
  // imports: [],
  templateUrl: './mediaitem.component.html',
  styleUrl: './mediaitem.component.css'
})
export class MediaitemComponent {
  ListMediaItem: MediaItem[] = [];

  mediaType! : string;
  urlItem! : string;
  description! : string;
  mediaItem_Id! : number;

  hubConnection! : signalr.HubConnection;

  disable! : boolean;

  ngOnInit() {
    this.hubConnection = new signalr.HubConnectionBuilder()
        .withUrl("https://localhost:7069/mediaitem")
        .build();

    this.hubConnection.on("receiveMediaItem",
      (mediaItem : MediaItem) => {
        this.ListMediaItem.push(mediaItem);
      });

    this.hubConnection.start()
      .then(() => console.log("Connected Rigth !!!!!"))
      .catch((error) => console.log(error))
  }

  onSubmit(form:NgForm) {
    console.log(form.value);
  }

  submit() {
    const mediaItem: MediaItem = {
      mediaType: this.mediaType,
      urlItem: this.urlItem,
      description: this.description,
      mediaItem_Id: this.mediaItem_Id
    };
    this.hubConnection.invoke("SubmitMediaItem", mediaItem)
      .catch(err => console.error(err));
  }
}

export interface MediaItem {
  mediaType : string;
  urlItem : string;
  description : string;
  mediaItem_Id : number;
}