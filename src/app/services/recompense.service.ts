import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { RecompenseModel } from '../models/recompense/recompense.model';
import { CONST_API } from '../constants/api-constants';
import { RecompenseCreationModel } from '../models/recompense/recompenseCreation.model';
import { RecompenseEditionModel } from '../models/recompense/recompenseEdition.model';

@Injectable({
  providedIn: 'root'
})
export class RecompenseService {
  private eventEmitter: EventEmitter<RecompenseModel[]> = new EventEmitter();

  constructor(private http: HttpClient) { 
    this.initializeConnections();
  }

  private initializeConnections(): void {
    this.eventEmitter.subscribe((recompenses: RecompenseModel[]) => { 
      console.log('Event received', recompenses);
    });
  }

  public addListener(listener: (recompenses: RecompenseModel[]) => void): void {
    this.eventEmitter.subscribe(listener);
  }

  public emitEvent(recompenses: RecompenseModel[]): void {
    this.eventEmitter.emit(recompenses);
  }

  public async getAllRecompenses(): Promise<Array<RecompenseModel>> {
    const url: string = `${CONST_API.URL_API}/Recompense`;
    return this.http.get(url, { responseType: 'json'}).toPromise() as Promise<RecompenseModel[]>;
  }

  // Méthode pour émettre des événements après avoir récupérer les recompenses
  public async fetchAndEmitRecompenses(): Promise<void> {
    try {
      const recompenses = await this.getAllRecompenses();
      this.emitEvent(recompenses);   
    } catch (error) {
      console.error('Error fetching recompenses', error);
    }
  }
  public async createRecompense(recompenseCreated: RecompenseCreationModel): Promise<RecompenseModel> {
    const url: string = `${CONST_API.URL_API}/Recompense/create`;
    try {
      const response: any = await firstValueFrom(this.http.post(url, recompenseCreated, {responseType: 'json'}))

      return response as RecompenseModel

    } catch (error) {
      throw error;
    }
  }

  public async updateRecompense(recompense?: RecompenseEditionModel): Promise<RecompenseModel> {
    const url: string = `${CONST_API.URL_API}/Recompense/update`;
    try {
      const response: any = await firstValueFrom(this.http.put(url, recompense, {responseType: 'json'}));
      return response as RecompenseModel;
    } catch (error) {
      throw error;
    }
  }

  public async deleteRecompense(recompense_Id: number): Promise<void> {
    const url: string = `${CONST_API.URL_API}/Recompense/delete/${recompense_Id}`;
    try {
      await firstValueFrom(this.http.delete(url, {responseType: 'json'}));
    } catch (error) {
      throw error;
    }
  }
}
