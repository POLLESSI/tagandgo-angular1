import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WeatherForecastModel } from 'src/app/models/weatherForecast/weatherforecast.model';
import { WeatherForecastCreationModel } from 'src/app/models/weatherForecast/weatherforecastCreation.model';
import { WeatherForecastEditionModel } from 'src/app/models/weatherForecast/weatherforecastEdition.model';
import { WeatherforecastService } from 'src/app/services/weatherforecast.service';

@Component({
  selector: 'app-weatherforecast',
  templateUrl: './weatherforecast.component.html',
  styleUrl: './weatherforecast.component.css'
})
export class WeatherforecastComponent {
  listWeatherForecasts: WeatherForecastModel[] = [];

  date! : string;
  temperatureC! : string;
  temperatureF! : string;
  summary! : string;
  description! : string;
  humidity! : string;
  precipitation! : string;
  nEvenement_Id! : number;

  disable! : boolean;

  showForm: boolean;
  isFormEdition: boolean;
  weatherForecastToEdit: WeatherForecastModel;

  displayedColumns: string[] = ['date', 'temperatureC', 'temperatureF', 'summary', 'description', 'humidity', 'precipitation', 'nEvenement_Id'];

  constructor(private weatherForecastService: WeatherforecastService) {}

  public async ngOnInit(): Promise<void> {
    await this.getAllWeatherForecasts();
  }

  public async getAllWeatherForecasts(): Promise<void> {
    try {
      this.listWeatherForecasts = await this.weatherForecastService.getAllWeatherForecasts();

      console.log(this.listWeatherForecasts);

    } catch (error) {
      console.log("Error list Weather Forecasts");
    }
  }
  public async submit(weatherForecastForm: NgForm): Promise<void> {
    if (weatherForecastForm.invalid) {
      console.log("Form is invalid");
      return;
    }

    if (this.isFormEdition) {
      const weatherforecastEdited: WeatherForecastEditionModel = {
        weatherForecast_Id: this.weatherForecastToEdit.weatherForecast_Id,
        date: this.weatherForecastToEdit.date,
        temperatureC: this.weatherForecastToEdit.temperatureC,
        temperatureF: this.weatherForecastToEdit.temperatureF,
        summary: this.weatherForecastToEdit.summary,
        description: this.weatherForecastToEdit.description,
        humidity: this.weatherForecastToEdit.humidity,
        precipitation: this.weatherForecastToEdit.precipitation,
        nEvenement_Id: this.weatherForecastToEdit.nEvenement_Id,
      };

      try {
        const response: WeatherForecastModel = await this.weatherForecastService.createWeatherForecast(weatherforecastEdited);

        this.listWeatherForecasts.filter((w: WeatherForecastModel) => w.weatherForecast_Id != response.weatherForecast_Id);

        this.listWeatherForecasts.push(response);

      } catch(error) {
        console.log("Error creating weather forecast!")
      }
    }
    else {
      const weatherForecast: WeatherForecastCreationModel = {
        date: this.date,
        temperatureC: this.temperatureC,
        temperatureF: this.temperatureF,
        summary: this.summary,
        description: this.description,
        humidity: this.humidity,
        precipitation: this.precipitation,
        nEvenement_Id: this.nEvenement_Id
      };

      try {
        const response: WeatherForecastModel = await this.weatherForecastService.createWeatherForecast(weatherForecast);
        this.listWeatherForecasts.push(response);

      } catch (error) {
        console.log("Error creating Weather Forecast");
      }
    }
  }

  public onEdition(weatherForecast_Id: number): void {
    this.showForm = true;
    this.isFormEdition = true;

    this.weatherForecastToEdit = this.listWeatherForecasts.find((w: WeatherForecastModel) => w.weatherForecast_Id == weatherForecast_Id);

    this.date = this.weatherForecastToEdit.date;
    this.temperatureC = this.weatherForecastToEdit.temperatureC;
    this.temperatureF = this.weatherForecastToEdit.temperatureF;
    this.summary = this.weatherForecastToEdit.summary;
    this.description = this.weatherForecastToEdit.description;
    this.humidity = this.weatherForecastToEdit.humidity;
    this.precipitation = this.weatherForecastToEdit.precipitation;
    this.nEvenement_Id = this.weatherForecastToEdit.nEvenement_Id;
  }

  public onCancelForm(): void {
    this.showForm = false;
    this.isFormEdition = false;

    this.date = null;
    this.temperatureC = null;
    this.temperatureF = null;
    this.summary = null;
    this.description = null;
    this.humidity = null;
    this.precipitation = null;
    this.nEvenement_Id = null;
  }
}

