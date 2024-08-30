import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AvatarModel } from '../models/avatar.model';
import { CONST_API } from '../constants/api-constants';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(private http: HttpClient) { }

  public async getAllAvatars(): Promise<Array<AvatarModel>> {
    const url: string = `${CONST_API.URL_API}/Avatar`;

    try {
      const respons: any = await firstValueFrom(this.http.get(url, { responseType: 'json' }));

      return respons as Array<AvatarModel>

    } catch (error) {
      throw error;
    }
  }

  public async createAvatar(): Promise<void>  {
    try {

    } catch (error) {
      throw error;
    }
  }

  public async updateAvatar(): Promise<void>  {
    try {

    } catch (error) {
      throw error;
    }
  }

  public async deleteAvatar(): Promise<void>  {
    try {

    } catch (error) {
      throw error;
    }
  }
}
