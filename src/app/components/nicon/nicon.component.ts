import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NIconModel } from 'src/app/models/nicon/nicon.model';
import { NIconCreationModel } from 'src/app/models/nicon/niconCreation.model';
import { NiconService } from 'src/app/services/nicon.service';
@Component({
  selector: 'app-nicon',
  templateUrl: './nicon.component.html',
  styleUrl: './nicon.component.css'
})
export class NiconComponent implements OnInit {
  ListNIcons: NIconModel[] = [];

  nIconName! : string;
  nIconDescription! : string;
  nIconUrl! : string;

  disable! : boolean;

  constructor(private niconService: NiconService) {}

  public  async ngOnInit(): Promise<void> {
    await this.getAllNIcons();
  }

  public async getAllNIcons(): Promise<void> {
    try {
      this.ListNIcons = await this.niconService.getAllNIcons();
    } catch (error) {
      console.log("Error List Icons");
    }
  }

  public async submit(nIconForm: NgForm): Promise<void> {
    if (nIconForm.invalid) {
      console.log("Form is invalid");
      return;
    }
    const nIcon: NIconCreationModel = {
      nIconName: this.nIconName,
      nIconDescription: this.nIconDescription,
      nIconUrl: this.nIconUrl
    };

    console.log(nIcon);

    try {
      const response: NIconModel = await this.niconService.createNIcon(nIcon);
      this.ListNIcons.push(response);
    } catch (error) {
      console.log("Error creating icon!");
    }
  }
}

