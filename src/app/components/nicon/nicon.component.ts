import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NIconModel } from 'src/app/models/nicon/nicon.model';
import { NIconCreationModel } from 'src/app/models/nicon/niconCreation.model';
import { NIconEditionModel } from 'src/app/models/nicon/niconEdition.model';
import { NiconService } from 'src/app/services/nicon.service';
@Component({
  selector: 'app-nicon',
  templateUrl: './nicon.component.html',
  styleUrl: './nicon.component.css'
})
export class NiconComponent implements OnInit {
  listNIcons: NIconModel[] = [];

  nIconName! : string;
  nIconDescription! : string;
  nIconUrl! : string;

  disable! : boolean;

  showForm: boolean;
  isFormEdition: boolean;
  niconToEdit: NIconModel;

  displayedColumns: string[] = ['nIconName', 'nIconDescription', 'nIconUrl'];

  constructor(private niconService: NiconService) {}

  public  async ngOnInit(): Promise<void> {
    await this.getAllNIcons();
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

