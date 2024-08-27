import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
//import * as signalr from '@microsoft/signalr';
import { MediaItemModel } from 'src/app/models/mediaitem.model';
import { MediaitemService } from 'src/app/services/mediaitem.service';  
//import { error } from 'console';

@Component({
  selector: 'app-mediaitem',
  // standalone: true,
  // imports: [],
  templateUrl: './mediaitem.component.html',
  styleUrl: './mediaitem.component.css'
})
export class MediaitemComponent implements OnInit {
  ListMediaItems: MediaItemModel[] = [];

  mediaType! : string;
  urlItem! : string;
  description! : string;
  mediaItem_Id! : number;

  //hubConnection! : signalr.HubConnection;

  disable! : boolean;

  constructor(private mediaitemService: MediaitemService) {}

  async ngOnInit(): Promise<void> {
    await this.getAllMediaItems();
    // this.hubConnection = new signalr.HubConnectionBuilder()
    //     .withUrl("https://localhost:7069/mediaitem")
    //     .build();

    // this.hubConnection.on("receiveMediaItem",
    //   (mediaItem : MediaItemModel) => {
    //     this.ListMediaItem.push(mediaItem);
    //   });

    // this.hubConnection.start()
    //   .then(() => console.log("Connected Rigth !!!!!"))
    //   .catch((error) => console.log(error))
  }

  async getAllMediaItems(): Promise<void> {
    try {
      this.ListMediaItems = await this.mediaitemService['getAllMediaItems']();
    } catch (error) {
      console.log("Error list Média Items");
    }
  }

  onSubmit(form:NgForm) {
    console.log(form.value);
  }

  submit() :void {
    const mediaItem: MediaItemModel = {
      mediaType: this.mediaType,
      urlItem: this.urlItem,
      description: this.description,
      mediaItem_Id: this.mediaItem_Id
    };
    // this.hubConnection.invoke("SubmitMediaItem", mediaItem)
    //   .catch(err => console.error(err));
  }
}

