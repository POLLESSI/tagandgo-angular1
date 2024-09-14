import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WeatherForecastModel } from 'src/app/models/weatherForecast/weatherforecast.model';
import { WeatherForecastCreationModel } from 'src/app/models/weatherForecast/weatherforecastCreation.model';
import { WeatherforecastService } from 'src/app/services/weatherforecast.service';

@Component({
  selector: 'app-weatherforecast',
  templateUrl: './weatherforecast.component.html',
  styleUrl: './weatherforecast.component.css'
})
export class WeatherforecastComponent {
  listWeatherForecasts: WeatherForecastModel[] = [];

  temperatureC! : string;
  temperatureF! : string;
  summary! : string;
  description! : string;
  humidity! : string;
  precipitation! : string;
  nEvenement_Id! : number;

  disable! : boolean;

  showForm: boolean;
  displayedColums: string[] = ['temperatureC', 'temperatureF', 'summary', 'description', 'humidity', 'precipitation', 'nEvenement_Id']
displayedColumns: any;

  constructor(private weatherForecastService: WeatherforecastService) {}

  public async ngOnInit(): Promise<void> {
    await this.getAllWeatherForecasts();

    this.listWeatherForecasts = [
      // "weatherForecast_Id": 1,
      // "temperatureC": "25",
      // "temperatureF": "444",
      // "summary": "Pluies Torantielles pour toute la journée",
      // "description": "Alerte rouge aux intemperies",
      // "humidity": "99.9",
      // "precipitation": "99.9",
      // "nEvenement_Id": 1
    ]
  }

  public async getAllWeatherForecasts(): Promise<void> {
    try {
      this.listWeatherForecasts = await this.weatherForecastService.getAllWeatherForecasts();
    } catch (error) {
      console.log("Error list Weather Forecasts");
    }
  }
  public async submit(weatherForecastForm: NgForm): Promise<void> {
    if (weatherForecastForm.invalid) {
      console.log("Form is invalid");
      return;
    }

    const weatherforecast: WeatherForecastCreationModel = {
      temperatureC: this.temperatureC,
      temperatureF: this.temperatureF,
      summary: this.summary,
      description: this.description,
      humidity: this.humidity,
      precipitation: this.precipitation,
      nEvenement_Id: this.nEvenement_Id
    };

    console.log(weatherforecast);

    try {
      const response: WeatherForecastModel = await this.weatherForecastService.createWeatherForecast(weatherforecast);
      this.listWeatherForecasts.push(response);
    } catch(error) {
      console.log("Error creating weather forecast!")
    }
  }
}

