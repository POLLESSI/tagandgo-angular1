import { Component, OnInit } from '@angular/core';
import { MediaItemModel } from 'src/app/models/mediaitem.model';
import { MediaitemService } from 'src/app/services/mediaitem.service';  
@Component({
  selector: 'app-mediaitem',
  templateUrl: './mediaitem.component.html',
  styleUrl: './mediaitem.component.css'
})
export class MediaitemComponent implements OnInit {
  ListMediaItems: MediaItemModel[] = [];

  mediaType! : string;
  urlItem! : string;
  description! : string;
  mediaItem_Id! : number;

  disable! : boolean;

  constructor(private mediaitemService: MediaitemService) {}

  async ngOnInit(): Promise<void> {
    await this.getAllMediaItems();
  }

  async getAllMediaItems(): Promise<void> {
    try {
      this.ListMediaItems = await this.mediaitemService.getAllMediaItems();
    } catch (error) {
      console.log("Error list Média Items");
    }
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

