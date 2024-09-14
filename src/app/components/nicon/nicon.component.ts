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
  listNIcons: NIconModel[] = [];

  nIconName! : string;
  nIconDescription! : string;
  nIconUrl! : string;

  disable! : boolean;

  showForm: boolean;
  displayedColums: string[] = ['nIconName', 'nIconDescription', 'nIconUrl']
displayedColumns: any;

  constructor(private niconService: NiconService) {}

  public  async ngOnInit(): Promise<void> {
    await this.getAllNIcons();

    this.listNIcons = [
      // "nIcon_Id": 1,
      // "nIconName": "Albator",
      // "nIconUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxyUufi9EbnWTryfrzGM7fd8b8sHeVOb6fyw&s"
    ]
  }

  public async getAllNIcons(): Promise<void> {
    try {
      this.listNIcons = await this.niconService.getAllNIcons();
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
      this.listNIcons.push(response);
    } catch (error) {
      console.log("Error creating icon!");
    }
  }
}

