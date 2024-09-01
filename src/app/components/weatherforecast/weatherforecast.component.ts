import { Component } from '@angular/core';
import { WeatherForecastModel } from 'src/app/models/weatherforecast.model';
import { WeatherforecastService } from 'src/app/services/weatherforecast.service';

@Component({
  selector: 'app-weatherforecast',
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

  disable! : boolean;

  constructor(private weatherForecastService: WeatherforecastService) {}

  async ngOnInit(): Promise<void> {
    await this.getAllWeatherForecasts();
  }

  async getAllWeatherForecasts(): Promise<void> {
    try {
      this.ListWeatherForecasts = await this.weatherForecastService.getAllWeatherForecasts();
    } catch (error) {
      console.log("Error list Weather Forecasts");
    }
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
  }
}

