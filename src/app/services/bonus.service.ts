import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { BonusModel } from '../models/bonus.model';
import { CONST_API } from '../constants/api-constants';

@Injectable({
  providedIn: 'root'
})
export class BonusService {
  
  constructor(private http: HttpClient) { }

  public async getAllBonuss(): Promise<Array<BonusModel>> {
    const url: string = `${CONST_API.URL_API}/Bonus`;

    try {
      const respons: any = await firstValueFrom(this.http.get(url, {responseType: 'json'}));

      return respons as Array<BonusModel>
    } catch (error) {
      throw error;
    }
  }

  public async createBonus(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }

  public async deleteBonus(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }
}
