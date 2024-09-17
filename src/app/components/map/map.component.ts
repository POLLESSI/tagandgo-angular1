import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MapModel } from 'src/app/models/map/map.model';
import { MapCreationModel } from 'src/app/models/map/mapCreation.model';
import { MapEditionModel } from 'src/app/models/map/mapEdition.model';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  listMaps: MapModel[] = [];

  dateCreation! : string;
  mapUrl! : string;
  description! : string;

  disable! : boolean;

  showForm: boolean;
  isFormEdition: boolean;
  mapToEdit: MapModel;

  displayedColumns: string[] = ['dateCreation', 'mapUrl', 'description']

  constructor(private mapService: MapService) {}

  public async ngOnInit(): Promise<void> {
    await this.getAllMaps();
  }

  public async getAllMaps(): Promise<void> {
    try {
      this.listMaps = await this.mapService.getAllMaps();

      console.log(this.listMaps);

    }catch (error) {
      console.log("Error List Maps");
    }
  }

  public async submit(mapForm: NgForm): Promise<void> {
    if (mapForm.invalid) {
      console.log("Form is invalid");
      return;
    }

    if (this.isFormEdition) {
      const mapEdited: MapEditionModel = {
        map_Id: this.mapToEdit.map_Id,
        dateCreation: this.mapToEdit.dateCreation,
        mapUrl: this.mapToEdit.mapUrl,
        description: this.mapToEdit.description,
        
      };

      // try {
      //   const response: MapModel = await this.mapService.updateMap(mapEdited);

      //   this.listMaps.filter((m: MapModel) => m.map_Id != response.map_Id);

      //   this.listMaps.push(response);

      // } catch (error) {
      //   console.log("Error update map!");
      // }
    }
    else {
      const map: MapCreationModel = {
        dateCreation: this.dateCreation,
        mapUrl: this.mapUrl,
        description: this.description
      };

      try {
        const response: MapModel = await this.mapService.createMap(map);
        this.listMaps.push(response);

      } catch (error) {
        console.log("Error creating map!");
      }
    }
  }
  
  public onEdition(map_Id: number): void {
    this.showForm = true;
    this.isFormEdition = true; 

    this.mapToEdit = this.listMaps.find((m: MapModel) => m.map_Id == map_Id);

    this.dateCreation = this.mapToEdit.dateCreation;
    this.mapUrl = this.mapToEdit.mapUrl;
    this.description = this.mapToEdit.description;
  }

  public onCancelForm(): void {
    this.showForm = false;
    this.isFormEdition = false;

    this.dateCreation = null;
    this.mapUrl = null;
    this.description = null;
  }
}

