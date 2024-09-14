import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MapModel } from 'src/app/models/map/map.model';
import { MapCreationModel } from 'src/app/models/map/mapCreation.model';
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
  displayedColums: string[] = ['dateCreation', 'mapUrl', 'description']
displayedColumns: any;

  constructor(private mapService: MapService) {}

  public async ngOnInit(): Promise<void> {
    await this.getAllMaps();

    this.listMaps = [
      // "map_Id": 1,
      // "dateCreation": "19-09-2024",
      // "mapUrl": "https://www.openstreetmap.org/#map=18/50.827895/4.371888",
      // "description": "Région bruxelloise Place Flagey"
    ]
  }

  public async getAllMaps(): Promise<void> {
    try {
      this.listMaps = await this.mapService.getAllMaps();
    }catch (error) {
      console.log("Error List Maps");
    }
  }

  public async submit(mapForm: NgForm): Promise<void> {
    if (mapForm.invalid) {
      console.log("Form is invalid");
      return;
    }
    const map: MapCreationModel = {
      dateCreation: this.dateCreation,
      mapUrl: this.mapUrl,
      description: this.description
    };

    console.log(map);

    try {
      const response: MapModel = await this.mapService.createMap(map);
      this.listMaps.push(response);
    } catch (error) {
      console.log("Error creating map!");
    }
  } 
}

