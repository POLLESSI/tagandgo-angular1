import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { WeatherForecastModel } from '../models/weatherForecast/weatherforecast.model';
import { CONST_API } from '../constants/api-constants';
import { WeatherForecastCreationModel } from '../models/weatherForecast/weatherforecastCreation.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherforecastService {

  constructor(private http: HttpClient) { }

  public async getAllWeatherForecasts(): Promise<Array<WeatherForecastModel>> {
    const url: string = `${CONST_API.URL_API}/WeatherForecast`;

    try {
      const respons: any = await firstValueFrom(this.http.get(url, { responseType: 'json'}));

      return respons as Array<WeatherForecastModel>
    } catch (error) {
      throw error;
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
