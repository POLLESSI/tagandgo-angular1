import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { WeatherForecastModel } from '../models/weatherForecast/weatherforecast.model';
import { CONST_API } from '../constants/api-constants';
import { WeatherForecastCreationModel } from '../models/weatherForecast/weatherforecastCreation.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherforecastService {
  private eventEmitter: EventEmitter<WeatherForecastModel[]> = new EventEmitter();

  constructor(private http: HttpClient) {
    this.initializeConnections();
  }

  private initializeConnections(): void {
    this.eventEmitter.subscribe((weatherforecasts: WeatherForecastModel[]) => {
      console.log('Event received', weatherforecasts);
    })
  }

  public addListener(listener: (weatherforecasts: WeatherForecastModel[]) => void): void {
    this.eventEmitter.subscribe(listener);
  }

  public emitEvent(weatherforecasts: WeatherForecastModel[]): void {
    this.eventEmitter.emit(weatherforecasts);
  }

  public async getAllWeatherForecasts(): Promise<Array<WeatherForecastModel>> {
    const url: string = `${CONST_API.URL_API}/WeatherForecast`;
    return this.http.get(url, { responseType: 'json'}).toPromise() as Promise<WeatherForecastModel[]>;
  }

  // Méthode pour émettre des événements après avoir récupéré les prévisions météorologiques
  public async fetchAndEmitWeatherForecasts(): Promise<void> {
    try {
      const weatherforecasts = await this.getAllWeatherForecasts();
      this.emitEvent(weatherforecasts);
    } catch (error) {
      console.error('Error fetching weatherforecasts', error);
    }
  } 
  
  public async getByIdWeatherForecast(): Promise<void> {
    try {
      
    } catch (error) {
      
    }
  }

  public async createWeatherForecast(weatherforecastCreated: WeatherForecastCreationModel): Promise<WeatherForecastModel> {
    const url: string = `${CONST_API.URL_API}/WeatherForecast/create`;
    try {
      const response: any = await firstValueFrom(this.http.post(url, weatherforecastCreated, {responseType: 'json'}))

      return response as WeatherForecastModel

    } catch (error) {
      throw error;
    }
  }

  public async updateWeatherForecast(): Promise<void> {
    try {
      
    } catch (error) {
      throw error;
    }
  }

  public async deleteWeatherForecasr(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }
}
