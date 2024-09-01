import { Component, OnInit } from '@angular/core';
import { NIconModel } from 'src/app/models/nicon.model';
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
  nIcon_Id! : number;

  disable! : boolean;

  constructor(private niconService: NiconService) {}

  async ngOnInit(): Promise<void> {
    await this.getAllNIcons();
  }

  async getAllNIcons(): Promise<void> {
    try {
      this.ListNIcons = await this.niconService.getAllNIcons();
    } catch (error) {
      console.log("Error List Icons");
    }
  }

  submit(): void {
    const nIcon: NIconModel = {
      nIconName: this.nIconName,
      nIconDescription: this.nIconDescription,
      nIconUrl: this.nIconUrl,
      nIcon_Id: this.nIcon_Id
    };
  }
}

