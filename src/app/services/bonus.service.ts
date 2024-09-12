import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { BonusModel } from '../models/bonus/bonus.model';
import { CONST_API } from '../constants/api-constants';
import { BonusCreationModel } from '../models/bonus/bonusCreation.model';

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

  public async createBonus(bonusCreated: BonusCreationModel): Promise<BonusModel> {
    const url: string = `${CONST_API.URL_API}/Bonus/create`;

    try {
      const response: any = await firstValueFrom(this.http.post(url, bonusCreated, {responseType: 'json'}))

    return response as BonusModel

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
