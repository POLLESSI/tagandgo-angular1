import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { CONST_API } from 'src/app/constants/api-constants';
import { AvatarModel } from 'src/app/models/avatar/avatar.model';
import { AvatarCreationModel } from 'src/app/models/avatar/avatarCreation.model';
import { AvatarEditionModel } from 'src/app/models/avatar/avatarEdition.model';
import { AvatarService } from 'src/app/services/avatar.service';
import { SignalRService } from 'src/app/services/signalr.service';
import { MapService } from 'src/app/services/map.service';
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
  selector: 'app-avatar',
  // template: `<button (click)="emitEvent()">Emit Event</button>`,
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
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
    MatButtonModule,
  ]
})
export class AvatarComponent implements OnInit {
  isLoading = false;

  listAvatars: AvatarModel[] = [];

  avatarName! : string;
  avatarUrl! : string;
  description! : string;

  disable! : boolean;

  showForm: boolean;
  isFormEdition: boolean;
  avatarToEdit: AvatarModel;

  displayedColumns: string[] = ['avatarName', 'avatarUrl', 'description'];

  constructor(
    private SignalRService: SignalRService,
    private avatarService: AvatarService,
  ) {}
  ngAfterViewInit(): void{
    //this.initMap();
    //throw new Error('Method not implemented.')
  }
  public async ngOnInit(): Promise<void> {
    this.isLoading = true;
    console.log('Avatar Component initialized');
    this.avatarService.addListener((avatars: AvatarModel[]) => {
      console.log('Avatars received', avatars);
      this.isLoading = false;
    });
    // S'assurer que les appels API sont effectués
    try {
      const avatars = await this.avatarService.getAllAvatars();
      console.log('Avatars fetched from API:', avatars);
    } catch (error) {
      console.error('Error fetching avatars:', error);
    }
    await this.getAllAvatars();
  }

  emitEvent(): void {
    const avatars: AvatarModel[] = [
      {avatar_Id: 1, 
       avatarName: 'avatar1',
       avatarUrl: 'url1', 
       description: 'description1'
      }];
    this.avatarService.emitEvent(avatars);
  }

  public async getAllAvatars(): Promise<void> {
    try {
      this.listAvatars = await this.avatarService.getAllAvatars();

      console.log(this.listAvatars);

    } catch (error) {
      console.log("Error list avatars");
    }
  }

  public async submit(avatarForm: NgForm): Promise<void> {
    if (avatarForm.invalid) {
      console.log("Form is invalid");
      return;
    }

    if (this.isFormEdition) {
      const avatar: AvatarCreationModel = {
        avatarName: this.avatarName,
        avatarUrl: this.avatarUrl,
        description: this.description,
      };
      try {
        const response: AvatarModel = await this.avatarService.createAvatar(avatar);

        this.listAvatars.filter((a: AvatarModel) => a.avatar_Id != response.avatar_Id);

        this.listAvatars.push(response);

      } catch (error) {
        console.log("Error update avatar!");
      }
    }
    else {
      const avatar: AvatarCreationModel = {
        avatarName: this.avatarName,
        avatarUrl: this.avatarUrl,
        description: this.description
      };

      try {
        const response: AvatarModel = await this.avatarService.createAvatar(avatar);
        this.listAvatars.push(response);

      } catch (error) {
        console.log("Error creating avatar!");
      }
    }
  }

  public onEdition(avatar_Id: number): void {
    this.showForm = true;
    this.isFormEdition = true;

    this.avatarToEdit = this.listAvatars.find((a: AvatarModel) => a.avatar_Id == avatar_Id);

    this.avatarName = this.avatarToEdit.avatarName;
    this.avatarUrl = this.avatarToEdit.avatarUrl;
    this.description = this.avatarToEdit.description;
  }

  public onCancelForm(): void {
    this.cancelForm();
    
  }
  public cancelForm(): void {
    this.showForm = false;
    this.isFormEdition = false;

    this.avatarName = null;
    this.avatarUrl = null;
    this.description = null;
  }
  public async deleteAvatar(avatar_Id: number): Promise<void> {
    if (confirm('Are you sure you want to delete this avatar?')){
      try {
        this.listAvatars = this.listAvatars.filter(av => av.avatar_Id !== avatar_Id);
        console.log('Avatar with ID ${avatar_Id} has been deleted');
      } catch (error) {
        console .log("Error deleting avatar:", error);
      }
    }
  }

  public async updateAvatar(avatarUpdated: AvatarEditionModel): Promise<void> {
    const url: string = `${CONST_API.URL_API}/Avatar/update`;
    // Checking required fields
    if (!avatarUpdated.avatar_Id || !avatarUpdated.avatarName || !avatarUpdated.avatarUrl || !avatarUpdated.description) {
      console.log('Missing required fields for avatar update');
      return;
    }
    try {
    
    } catch (error) {
      console.error("Error updating avatar:", error);
    }    
  } 
}
