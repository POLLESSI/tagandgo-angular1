import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
//import * as signalr from '@microsoft/signalr';
import { WeatherForecastModel } from 'src/app/models/weatherforecast.model';
import { WeatherforecastService } from 'src/app/services/weatherforecast.service';

@Component({
  selector: 'app-weatherforecast',
  // standalone: true,
  // imports: [],
  templateUrl: './weatherforecast.component.html',
  styleUrl: './weatherforecast.component.css'
})
export class WeatherforecastComponent {
  ListWeatherForecasts: WeatherForecastModel[] = [];

  temperatureC! : string;
  temperatureF! : string;
  summary! : string;
  description! : string;
  humidity! : string;
  precipitation! : string;
  nEvenement_Id! : number;
  weatherForecast_Id! : number;

  //hubConnection! : signalr.HubConnection;

  disable! : boolean;

  constructor(private weatherForecastService: WeatherforecastService) {}

  async ngOnInit(): Promise<void> {
    await this.getAllWeatherForecasts();
    // this.hubConnection = new signalr.HubConnectionBuilder()
    //     .withUrl("https://localhost:7069/weatherforecast")
    //     .build();

    // this.hubConnection.on("receiveWeatherForecast",
    //   (weatherforecast : WeatherForecastModel) => {
    //     this.ListWeatherForecast.push(weatherforecast);
    //   });

    // this.hubConnection.start()
    //   .then(() => console.log("Connected Rigth !!!!!"))
    //   .catch((error) => console.log(error));
  }

  async getAllWeatherForecasts(): Promise<void> {
    try {
      this.ListWeatherForecasts = await this.weatherForecastService['getAllWeatherForecasts']();
    } catch (error) {
      console.log("Error list Weather Forecasts");
    }
  }

  onSubmit(form:NgForm) {
    console.log(form.value);
  }

  submit(): void {
    const weatherforecast: WeatherForecastModel = {
      temperatureC: this.temperatureC,
      temperatureF: this.temperatureF,
      summary: this.summary,
      description: this.description,
      humidity: this.humidity,
      precipitation: this.precipitation,
      nEvenement_Id: this.nEvenement_Id,
      weatherForecast_Id: this.weatherForecast_Id
    }
    // this.hubConnection.invoke("SubmitWeatherForecast", weatherforecast)
    //   .catch(err => console.error(err));
  }
}

