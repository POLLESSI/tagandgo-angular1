import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import * as signalr from '@microsoft/signalr';

@Component({
  selector: 'app-weatherforecast',
  // standalone: true,
  // imports: [],
  templateUrl: './weatherforecast.component.html',
  styleUrl: './weatherforecast.component.css'
})
export class WeatherforecastComponent {
  ListWeatherForecast: WeatherForecast[] = []

  temperatureC! : string;
  temperatureF! : string;
  summary! : string;
  description! : string;
  humidity! : string;
  precipitation! : string;
  nEvenement_Id! : number;
  weatherForecast_Id! : number;

  hubConnection! : signalr.HubConnection;

  disable! : boolean;

  ngOnInit() {
    this.hubConnection = new signalr.HubConnectionBuilder()
        .withUrl("https://localhost:7069/weatherforecast")
        .build();

    this.hubConnection.on("receiveWeatherForecast",
      (weatherforecast : WeatherForecast) => {
        this.ListWeatherForecast.push(weatherforecast);
      });

    this.hubConnection.start()
      .then(() => console.log("Connected Rigth !!!!!"))
      .catch((error) => console.log(error));
  }

  onSubmit(form:NgForm) {
    console.log(form.value);
  }

  submit() {
    const weatherforecast: WeatherForecast = {
      temperatureC: this.temperatureC,
      temperatureF: this.temperatureF,
      summary: this.summary,
      description: this.description,
      humidity: this.humidity,
      precipitation: this.precipitation,
      nEvenement_Id: this.nEvenement_Id,
      weatherForecast_Id: this.weatherForecast_Id
    }
    this.hubConnection.invoke("SubmitWeatherForecast", weatherforecast)
      .catch(err => console.error(err));
  }
}

export interface WeatherForecast {
  temperatureC : string;
  temperatureF : string;
  summary : string;
  description : string;
  humidity : string;
  precipitation : string;
  nEvenement_Id : number;
  weatherForecast_Id : number;
}