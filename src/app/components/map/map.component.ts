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
  ListMaps: MapModel[] = [];

  dateCreation! : string;
  mapUrl! : string;
  description! : string;

  disable! : boolean;

  constructor(private mapService: MapService) {}

  public async ngOnInit(): Promise<void> {
    await this.getAllMaps();
  }

  public async getAllMaps(): Promise<void> {
    try {
      this.ListMaps = await this.mapService.getAllMaps();
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
      this.ListMaps.push(response);
    } catch (error) {
      console.log("Error creating map!");
    }
  } 
}

