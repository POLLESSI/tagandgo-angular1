import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { RecompenseModel } from '../models/recompense/recompense.model';
import { CONST_API } from '../constants/api-constants';
import { RecompenseCreationModel } from '../models/recompense/recompenseCreation.model';

@Injectable({
  providedIn: 'root'
})
export class RecompenseService {

  constructor(private http: HttpClient) { }

  public async getAllRecompenses(): Promise<Array<RecompenseModel>> {
    const url: string = `${CONST_API.URL_API}/Recompense`;

    try {
      const respons: any = await firstValueFrom(this.http.get(url, {responseType: 'json'}));

      return respons as Array<RecompenseModel>
    } catch (error) {
      throw error;
    }
  }

  public async createRecompense(recompense: RecompenseCreationModel): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }

  public async updateRecompense(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }

  public async deleteRecompense(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }
}
