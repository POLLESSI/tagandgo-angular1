import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import * as signalr from '@microsoft/signalr';
//import { error } from 'console';

@Component({
  selector: 'app-map',
  // standalone: true,
  // imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  ListMap: Map[] = [];

  dateCreation! : string;
  mapUrl! : string;
  description! : string;
  map_Id! : number;

  hubConnection! : signalr.HubConnection;

  disable! : boolean;

  ngOnInit() {
    this.hubConnection = new signalr.HubConnectionBuilder()
        .withUrl("https://localhost:7069/map")
        .build();

    this.hubConnection.on("receiveMap",
      (map : Map) => {
        this.ListMap.push(map);
      });

    this.hubConnection.start()
      .then(() => console.log("Connected Rigth !!!!!"))
      .catch((error) => console.log(error))
  }

  onSubmit(form:NgForm) {
    console.log(form.value);
  }

  submit() {
    const map: Map = {
      dateCreation: this.dateCreation,
      mapUrl: this.mapUrl,
      description: this.description,
      map_Id: this.map_Id
    };
    this.hubConnection.invoke("SubmitMap", map)
      .catch(err => console.error(err));
  }

}

export interface Map {
  dateCreation : string;
  mapUrl : string;
  description : string;
  map_Id : number;
}