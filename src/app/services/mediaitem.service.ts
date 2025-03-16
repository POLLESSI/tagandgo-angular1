import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { MediaItemModel } from '../models/mediaitem/mediaitem.model';
import { CONST_API } from '../constants/api-constants';
import { MediaItemCreationModel } from '../models/mediaitem/mediaitemCreation.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaitemService {
  private eventEmitter :EventEmitter<MediaItemModel[]> = new EventEmitter();

  constructor(private http: HttpClient) { }

  public addListener(listener: (mediaItems: MediaItemModel[]) => void): void {
    this.eventEmitter.subscribe(listener);
  }

  public emitEvent(mediaItems: MediaItemModel[]): void {
    this.eventEmitter.emit(mediaItems);
  }

  public async getAllMediaItems(): Promise<Array<MediaItemModel>> {
    const url: string = `${CONST_API.URL_API}/MediaItem`;
    return this.http.get<MediaItemModel[]>(`${environment.apiUrl}/activities`).toPromise();
    //Méthode pour émettre des événements après avoir récupérer les médias
  }

  public async fetchAndEmitMediaItems(): Promise<void> {
    try {
      const mediaItems = await this.getAllMediaItems();
      this.emitEvent(mediaItems);
    } catch (error) {
      console.error('Error fetching media items:', error);
    }
  }

  public async createMediaItem(mediaItemCreated: MediaItemCreationModel): Promise<MediaItemModel> {
    const url: string = `${CONST_API.URL_API}/MediaItem/create`;
    try {
      const response: any = await firstValueFrom(this.http.post(url, mediaItemCreated, {responseType: 'json'}))

      return response as MediaItemModel

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
