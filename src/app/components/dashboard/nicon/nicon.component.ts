import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalRService } from 'src/app/services/signalr.service';
import { NgForm } from '@angular/forms';
import { CONST_API } from 'src/app/constants/api-constants';
import { NIconModel } from 'src/app/models/nicon/nicon.model';
import { NIconCreationModel } from 'src/app/models/nicon/niconCreation.model';
import { NIconEditionModel } from 'src/app/models/nicon/niconEdition.model';
import { NiconService } from 'src/app/services/nicon.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RoutesDefined } from 'src/app/constants/routes';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-nicon',
  // template: `<button (click)="emitEvent()">Emit Event</button>`,
  templateUrl: './nicon.component.html',
  styleUrls: ['./nicon.component.css'],
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
export class NiconComponent implements OnInit {
  isLoading = false;

  listNIcons: NIconModel[] = [];

  nIconName! : string;
  nIconDescription! : string;
  nIconUrl! : string;

  disable! : boolean;

  showForm: boolean;
  isFormEdition: boolean;
  niconToEdit: NIconModel;

  displayedColumns: string[] = ['nIconName', 'nIconDescription', 'nIconUrl'];

  constructor(
    private signalRService: SignalRService,
    private niconService: NiconService
  ) {}

  public  async ngOnInit(): Promise<void> {
    this.isLoading = true;

    console.log('Icon component initialized');
    this.niconService.addListener((nIcons: NIconModel[]) => {
      console.log('Event received', nIcons);
      this.isLoading = false;
    });

    // S'assurez que les appels API sont effectués
    try {
      const icons = await this.niconService.getAllNIcons();
      console.log('Icons fetched from API', icons);
    } catch (error) {
      console.error('Error fetching icons', error);
    }

    await this.getAllNIcons();
  }

  emitEvent(): void {
    const nIcons: NIconModel[] = [{
      nIcon_Id: 1,
      nIconName: '',
      nIconDescription: '',
      nIconUrl: ''
    }];
    this.niconService.emitEvent(nIcons);
  }

  public async getAllNIcons(): Promise<void> {
    try {
      this.listNIcons = await this.niconService.getAllNIcons();

      console.log(this.listNIcons);

    } catch (error) {
      console.log("Error List Icons");
    }
  }

  public async submit(nIconForm: NgForm): Promise<void> {
    if (nIconForm.invalid) {
      console.log("Form is invalid");
      return;
    }

    if (this.isFormEdition) {
      const nIconEdited: NIconEditionModel = {
        nIcon_Id: this.niconToEdit.nIcon_Id,
        nIconName: this.niconToEdit.nIconName,
        nIconDescription: this.niconToEdit.nIconDescription,
        nIconUrl: this.niconToEdit.nIconUrl,
      };
      try {
        const response: NIconModel = await this.niconService.createNIcon(nIconEdited);

        this.listNIcons.filter((i: NIconModel) => i.nIcon_Id != response.nIcon_Id);

        this.listNIcons.push(response);

      } catch (error) {
        console.log("Error creating icon!");
      }
    }
    else {
      const nicon: NIconCreationModel = {
        nIconName: this.nIconName,
        nIconDescription: this.nIconDescription,
        nIconUrl: this.nIconUrl
      };

      try {
        const response: NIconModel = await this.niconService.createNIcon(nicon);
        this.listNIcons.push(response);

      } catch (error) {
        console.log("Error creating icon")
      }
    }
  }
  public onEdition(nIcon_Id: number): void {
    this.showForm = true;
    this.isFormEdition = true;

    this.niconToEdit = this.listNIcons.find((i: NIconModel) => i.nIcon_Id == nIcon_Id);

    this.nIconName = this.niconToEdit.nIconName;
    this.nIconDescription = this.niconToEdit.nIconDescription;
    this.nIconUrl = this.niconToEdit.nIconUrl;
  }

  public onCancelForm(): void {
    this.showForm = false;
    this.isFormEdition = false;

    this.nIconName = null;
    this.nIconDescription = null;
    this.nIconUrl = null;
  }
}

