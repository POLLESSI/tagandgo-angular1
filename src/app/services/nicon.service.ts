import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { NIconModel } from '../models/nicon.model';
import { CONST_API } from '../constants/api-constants';

@Injectable({
  providedIn: 'root'
})
export class NiconService {

  constructor(private http: HttpClient) { }

  public async getAllNIcons(): Promise<Array<NIconModel>> {
    const url: string = `${CONST_API.URL_API}/NIcon`;

    try {
      const respons: any = await firstValueFrom(this.http.get(url, { responseType: 'json'}));

      return respons as Array<NIconModel>
    } catch (error) {
      throw error;
    }
  }

  public async createNIcon(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }

  public async updateNIcon(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }

  public async deleteNIcon(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }
}
