import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { MediaItemModel } from '../models/mediaitem/mediaitem.model';
import { CONST_API } from '../constants/api-constants';
import { MediaItemCreationModel } from '../models/mediaitem/mediaitemCreation.model';

@Injectable({
  providedIn: 'root'
})
export class MediaitemService {

  constructor(private http: HttpClient) { }

  public async getAllMediaItems(): Promise<Array<MediaItemModel>> {
    const url: string = `${CONST_API.URL_API}/MediaItem`;

    try {
      const respons: any = await firstValueFrom(this.http.get(url, { responseType: 'json'}));

      return respons as Array<MediaItemModel>
    } catch (error) {
      throw error;
    }
  }

  public async createMediaItem(mediaItem: MediaItemCreationModel): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }

  public async updateMediaItem(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }

  public async deleteMediaItem(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }
}
