import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { WeatherForecastModel } from '../models/weatherforecast.model';
import { CONST_API } from '../constants/api-constants';

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

  public async createWeatherForecast(): Promise<void> {
    try {

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
