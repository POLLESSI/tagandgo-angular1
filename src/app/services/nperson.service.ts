import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { NPersonModel } from '../models/nperson.model';
import { CONST_API } from '../constants/api-constants';

@Injectable({
  providedIn: 'root'
})
export class NpersonService {

  constructor(private http: HttpClient) { }

  public async getAllNPersons(): Promise<Array<NPersonModel>> {
    const url: string = `${CONST_API.URL_API}/NPerson`;

    try {
      const respons: any = await firstValueFrom(this.http.get(url, { responseType: 'json'}));

      return respons as Array<NPersonModel>
    } catch (error) {
      throw error;
    }
  }
  public async createNPerson(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }

  public async updateNPerson(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }

  public async deleteNPerson(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }
}
