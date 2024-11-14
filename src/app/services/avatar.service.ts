import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { AvatarModel } from '../models/avatar/avatar.model';
import { CONST_API } from '../constants/api-constants';
import { AvatarCreationModel } from '../models/avatar/avatarCreation.model';
import { AvatarEditionModel } from '../models/avatar/avatarEdition.model';

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
      throw new error('Error getting avatar : ${error}');
    }
  }

  public async createAvatar(avatarCreated: AvatarCreationModel): Promise<AvatarModel>  {
    const url: string = `${CONST_API.URL_API}/Avatar/create`;

    try {
      const respons: any = await firstValueFrom(this.http.post(url, avatarCreated, {responseType: 'json'}));

      return respons as AvatarModel

    } catch (error) {
      throw error;
    }
  }

  // public async updateAvatar(avatarUpdated: AvatarEditionModel): Observable<AvatarEditionModel>  {

  //   try {
  //     const url: string = `${CONST_API.URL_API}/Avatar/update`;

  //     console.log("UPDATE : ", url, avatarUpdated);

  //     return this.http.put<AvatarModel>(url, avatarUpdated, { responseType: 'json'});
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  public async deleteAvatar(avatar_Id: number): Promise<void>  {
    const url: string = `${CONST_API.URL_API}/Avatar/delete/${avatar_Id}`;

    try {
      await firstValueFrom(this.http.delete(url, {responseType: 'json'}));
      console.log(`Avatar with ID ${avatar_Id} deleted successfully`)
    } catch (error) {
      throw new error('Error deleting activity: ${error}');
    }
  }
}
function from(promise: Promise<AvatarModel[]>): Observable<AvatarModel[]> {
  throw new Error('Function not implemented');
}