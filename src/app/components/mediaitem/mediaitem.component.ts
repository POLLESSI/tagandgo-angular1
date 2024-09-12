import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MediaItemModel } from 'src/app/models/mediaitem/mediaitem.model';
import { MediaItemCreationModel } from 'src/app/models/mediaitem/mediaitemCreation.model';
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
mediaItemForm: NgForm;

  constructor(private mediaitemService: MediaitemService) {}

  public async ngOnInit(): Promise<void> {
    await this.getAllMediaItems();
  }

  public async getAllMediaItems(): Promise<void> {
    try {
      this.ListMediaItems = await this.mediaitemService.getAllMediaItems();
    } catch (error) {
      console.log("Error list Media Items");
    }
  }

  public async submit(mediaItemForm: NgForm): Promise<void> {
    if (mediaItemForm.invalid) {
      console.log("Error list Média Items!");
      return;
    }
    const mediaItem: MediaItemCreationModel = {
      mediaType: this.mediaType,
      urlItem: this.urlItem,
      description: this.description
    };
    console.log(mediaItem);

    try {
      const response: MediaItemModel = await this.mediaitemService.createMediaItem(mediaItem);
      this.ListMediaItems.push(response);
    } catch (error) {
      console.log("Error creating média items!");
    }
  }
}

