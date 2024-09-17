import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MediaItemModel } from 'src/app/models/mediaitem/mediaitem.model';
import { MediaItemCreationModel } from 'src/app/models/mediaitem/mediaitemCreation.model';
import { MediaItemEditionModel } from 'src/app/models/mediaitem/mediaitemEdition.model';
import { MediaitemService } from 'src/app/services/mediaitem.service';  
@Component({
  selector: 'app-mediaitem',
  templateUrl: './mediaitem.component.html',
  styleUrl: './mediaitem.component.css'
})
export class MediaitemComponent implements OnInit {

  listMediaItems: MediaItemModel[] = [];

  mediaType! : string;
  urlItem! : string;
  description! : string;
  mediaItem_Id! : number;

  disable! : boolean;
  mediaItemForm: NgForm;

  showForm: boolean;
  isFormEdition: boolean;
  mediaItemEdit: MediaItemModel;

  displayedColumns: string[] = ['mediaType', 'urlItem', 'description']

  constructor(private mediaitemService: MediaitemService) {}

  public async ngOnInit(): Promise<void> {
    await this.getAllMediaItems();
  }

  public async getAllMediaItems(): Promise<void> {
    try {
      this.listMediaItems = await this.mediaitemService.getAllMediaItems();

      console.log(this.listMediaItems);

    } catch (error) {
      console.log("Error list Media Items");
    }
  }

  public async submit(mediaItemForm: NgForm): Promise<void> {
    if (mediaItemForm.invalid) {
      console.log("Error list Média Items!");
      return;
    }

    if (this.isFormEdition) {
      const mediaItemEdited: MediaItemEditionModel = {
        mediaItem_Id: this.mediaItemEdit.mediaItem_Id,
        mediaType: this.mediaItemEdit.mediaType,
        urlItem: this.mediaItemEdit.urlItem,
        description: this.mediaItemEdit.description,
      };

      try {
        const response: MediaItemModel = await this.mediaitemService.createMediaItem(mediaItemEdited);

        this.listMediaItems.filter((mi: MediaItemModel) => mi.mediaItem_Id != response.mediaItem_Id);

        this.listMediaItems.push(response);
        
      } catch (error) {
        console.log("Error creating média items!");
      }
    }
    else {
      const mediaitem: MediaItemCreationModel = {
        mediaType: this.mediaType,
        urlItem: this.urlItem,
        description: this.description
      };

      try {
        const response: MediaItemModel = await this.mediaitemService.createMediaItem(mediaitem);
        this.listMediaItems.push(response);

      } catch (error) {
        console.log("Error creating Media Item!");
      }
    }
  }
  public onEdition(mediaItem_Id: number): void {
    this.showForm = true;
    this.isFormEdition = true;

    this.mediaItemEdit = this.listMediaItems.find((mi: MediaItemModel) => mi.mediaItem_Id == mediaItem_Id);

    this.mediaType = this.mediaItemEdit.mediaType;
    this.urlItem = this.mediaItemEdit.urlItem;
    this.description = this.mediaItemEdit.description;
  }

  public onCancalForm(): void {
    this.showForm = false;
    this.isFormEdition = false;

    this.mediaType = null;
    this.urlItem = null;
    this.description = null;
  }
}

