import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { NIconModel } from '../models/nicon/nicon.model';
import { CONST_API } from '../constants/api-constants';
import { NIconCreationModel } from '../models/nicon/niconCreation.model';

@Injectable({
  providedIn: 'root'
})
export class NiconService {
  private eventEmitter: EventEmitter<NIconModel[]> = new EventEmitter();

  constructor(private http: HttpClient) {
    this.initializeConnections();
  }
  private initializeConnections(): void {
    this.eventEmitter.subscribe((nIcons: NIconModel[]) => {
      console.log('Event received', nIcons);
    })
  }

  public addListener(listener: (nIcons: NIconModel[]) => void): void {
    this.eventEmitter.subscribe(listener);
  }
  public emitEvent(nIcons: NIconModel[]): void {
    this.eventEmitter.emit(nIcons);
  }

  public async getAllNIcons(): Promise<Array<NIconModel>> {
    const url: string = `${CONST_API.URL_API}/NIcon`;
    return this.http.get(url, { responseType: 'json'}).toPromise() as Promise<NIconModel[]>;
  }

  //Méthode pour émettre des événements après avoir récupéré les icones
  public async fetchAndEmitNIcons(): Promise<void> {
    try {
      const nIcons = await this.getAllNIcons();
      this.emitEvent(nIcons);
    } catch (error) {
      console.error('Error fetching icons', error);
    }
  }

  public async createNIcon(nIconCreated: NIconCreationModel): Promise<NIconModel> {
    const url: string = `${CONST_API.URL_API}/NIcon/create`;
    try {
      const response: any = await firstValueFrom(this.http.post(url, nIconCreated, {responseType: 'json'}))

      return response as NIconModel

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
