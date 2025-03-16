import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { CONST_API } from 'src/app/constants/api-constants';
import { MediaItemModel } from 'src/app/models/mediaitem/mediaitem.model';
import { MediaItemCreationModel } from 'src/app/models/mediaitem/mediaitemCreation.model';
import { MediaItemEditionModel } from 'src/app/models/mediaitem/mediaitemEdition.model';
import { MediaitemService } from 'src/app/services/mediaitem.service';  
import { SignalRService } from '../../../services/signalr.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RoutesDefined } from 'src/app/constants/routes';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-mediaitem',
  // template: `<button (click)="emitEvent()">Emit Event</button>`,
  templateUrl: './mediaitem.component.html',
  styleUrls: ['./mediaitem.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class MediaitemComponent implements OnInit {
  isLoading = false;

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

  constructor(
    private SignalRService: SignalRService,
    private mediaitemService: MediaitemService
  ) {}

  public async ngOnInit(): Promise<void> {
    this.isLoading = true;

    console.log('MediaItemComponent initialized');

    this.mediaitemService.addListener((mediaItems: MediaItemModel[]) => {
      console.log('Event received', mediaItems);
      this.isLoading = false;
    });

    // S'assurer que les appels API sont effectués
    try {
      const mediaItems = await this.mediaitemService.getAllMediaItems();
      console.log('Media Items received', mediaItems);
    } catch (error) {
      console.error('Error fetching Media Items:', error);
    }
    await this.getAllMediaItems();
  }

  emitEvent(): void {
    const mediaItems: MediaItemModel[] = [{
      mediaItem_Id: 1,
      mediaType: '',
      urlItem: '',
      description: ''
    }];
    this.mediaitemService.emitEvent(mediaItems);
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

