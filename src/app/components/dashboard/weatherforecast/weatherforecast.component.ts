import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalRService } from 'src/app/services/signalr.service';
import { NgForm, FormsModule } from '@angular/forms';
import { WeatherForecastModel } from 'src/app/models/weatherForecast/weatherforecast.model';
import { WeatherForecastCreationModel } from 'src/app/models/weatherForecast/weatherforecastCreation.model';
import { WeatherForecastEditionModel } from 'src/app/models/weatherForecast/weatherforecastEdition.model';
import { WeatherforecastService } from 'src/app/services/weatherforecast.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RoutesDefined } from 'src/app/constants/routes';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-weatherforecast',
  // template: `<button (click)="emitEvent()">Emit Event</button>`,
  templateUrl: './weatherforecast.component.html',
  styleUrls: ['./weatherforecast.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatSlideToggleModule, 
    MatButtonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class WeatherforecastComponent implements OnInit {
  isLoading = false;

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

  constructor(
    private signalRService: SignalRService,
    private weatherForecastService: WeatherforecastService
  ) {}

  public async ngOnInit(): Promise<void> {
    this.isLoading = true;

    console.log('Weather Forecast component initialized');

    this.weatherForecastService.addListener((weatherforecasts: WeatherForecastModel[]) => {
      console.log('WeatherForecastUpdated event received', weatherforecasts);
      this.listWeatherForecasts = weatherforecasts;
      this.isLoading = false;
    });

    // S'assurer que les appels API sont éffectués
    try {
      const weatherforecasts = await this.weatherForecastService.getAllWeatherForecasts();
      console.log('Weather Forecasts fetched from API', weatherforecasts);
    } catch (error) {
      console.error('Error fetching weather forecasts', error);
    }
    this.isLoading = false;
    
    await this.getAllWeatherForecasts();
  }

  emitEvent(): void {
    const weatherforecasts: WeatherForecastModel[] = [{
      weatherForecast_Id: 1,
      date: 'date',
      temperatureC: 'temperatureC',
      temperatureF: 'temperatureF',
      summary: 'summary',
      description: 'description',
      humidity: 'humidity',
      precipitation: 'precipitation',
      nEvenement_Id: 1
    }];
    this.weatherForecastService.emitEvent(weatherforecasts);
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

