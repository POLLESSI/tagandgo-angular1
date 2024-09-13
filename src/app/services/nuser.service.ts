import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { NUserModel } from '../models/nuser/nuser.model';
import { CONST_API } from '../constants/api-constants';
import { NUserCreationModel } from '../models/nuser/nuserCreationModel';

@Injectable({
  providedIn: 'root'
})
export class NuserService {

  constructor(private http: HttpClient) { }

  public async getAllNUsers(): Promise<Array<NUserModel>> {
    const url: string = `${CONST_API.URL_API}/NUser`;

    try {
      const respons: any = await firstValueFrom(this.http.get(url, { responseType: 'json'}));

      return respons as Array<NUserModel>
    } catch (error) {
      throw error;
    }
  }

  public async createNUser(nuserCreated: NUserCreationModel): Promise<NUserModel> {
    const url: string = `${CONST_API.URL_API}/NUser/create`;
    try {
      const response: any = await firstValueFrom(this.http.post(url, nuserCreated, {responseType: 'json'}))

      return response as NUserModel

    } catch (error) {
      throw error;
    }
  }

  public async updateNUser(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }

  public async deleteNUser(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }
}
