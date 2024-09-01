import { Component, OnInit } from '@angular/core';
import { MapModel } from 'src/app/models/map.model';
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
  map_Id! : number;

  disable! : boolean;

  constructor(private mapService: MapService) {}

  async ngOnInit(): Promise<void> {
    await this.getAllMaps();
  }

  async getAllMaps(): Promise<void> {
    try {
      this.ListMaps = await this.mapService.getAllMaps();
    }catch (error) {
      console.log("Error List Maps");
    }
  }

  submit(): void {
    const map: MapModel = {
      dateCreation: this.dateCreation,
      mapUrl: this.mapUrl,
      description: this.description,
      map_Id: this.map_Id
    };
  }

}

