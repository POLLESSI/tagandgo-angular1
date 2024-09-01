import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { NEvenementModel } from '../models/nevenement.model';
import { CONST_API } from '../constants/api-constants';

@Injectable({
  providedIn: 'root'
})
export class NevenementService {

  constructor(private http: HttpClient) { }

  public async getAllNEvenements(): Promise<Array<NEvenementModel>> {
    const url: string = `${CONST_API.URL_API}/NEvenement`;
    
    try {
      const respons: any = await firstValueFrom(this.http.get(url, {responseType: 'json'}));

      return respons as Array<NEvenementModel>
    } catch (error) {
      throw error;
    }
  }

  public async createNEvenement(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }

  public async updateNEvenement(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }

}
