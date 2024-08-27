import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
//import * as signalr from '@microsoft/signalr';
import { MapModel } from 'src/app/models/map.model';
import { MapService } from 'src/app/services/map.service';
//import { error } from 'console';

@Component({
  selector: 'app-map',
  // standalone: true,
  // imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  ListMaps: MapModel[] = [];

  dateCreation! : string;
  mapUrl! : string;
  description! : string;
  map_Id! : number;

  //hubConnection! : signalr.HubConnection;

  disable! : boolean;

  constructor(private mapService: MapService) {}

  async ngOnInit(): Promise<void> {
    await this.getAllMaps();
    // this.hubConnection = new signalr.HubConnectionBuilder()
    //     .withUrl("https://localhost:7069/map")
    //     .build();

    // this.hubConnection.on("receiveMap",
    //   (map : MapModel) => {
    //     this.ListMap.push(map);
    //   });

    // this.hubConnection.start()
    //   .then(() => console.log("Connected Rigth !!!!!"))
    //   .catch((error) => console.log(error))
  }

  async getAllMaps(): Promise<void> {
    try {
      this.ListMaps = await this.mapService['getAllMaps']();
    }catch (error) {
      console.log("Error List Maps");
    }
  }

  onSubmit(form:NgForm) {
    console.log(form.value);
  }

  submit(): void {
    const map: MapModel = {
      dateCreation: this.dateCreation,
      mapUrl: this.mapUrl,
      description: this.description,
      map_Id: this.map_Id
    };
    // this.hubConnection.invoke("SubmitMap", map)
    //   .catch(err => console.error(err));
  }

}

