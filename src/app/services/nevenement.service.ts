import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { NEvenementModel } from '../models/nevenement/nevenement.model';
import { CONST_API } from '../constants/api-constants';
import { NEvenementCreationModel } from '../models/nevenement/nevenementCreation.model';
import { NevenementComponent } from '../components/dashboard/nevenement/nevenement.component';

@Injectable({
  providedIn: 'root'
})
export class NevenementService {
  private apiUrl = "https://localhost:7069/nEvenement"; //URL API
  private eventEmitter: EventEmitter<NEvenementModel[]> = new EventEmitter();

  constructor(private http: HttpClient) { 
    this.initializeConnections();
  }

  private initializeConnections(){
    this.getAllNEvenements().then((Response: Array<NEvenementModel>) => {
      this.eventEmitter.emit(Response);
    });
  }

  public addListener(listener: (data: NEvenementModel[]) => void): void {
    this.eventEmitter.subscribe(listener);
  }

  public emitEvent(data: NEvenementModel[]): void {
    this.eventEmitter.emit(data);
  }

  public async getAllNEvenements(): Promise<Array<NEvenementModel>> {
    const url: string = `${CONST_API.URL_API}/NEvenement`;
    return this.http.get(url, {responseType: 'json'}).toPromise() as Promise<Array<NEvenementModel>>;   
  }

  // Méthode pour émettre des événements après avoir les événements
  public async fetchAndEmitNEvenements(): Promise<void> {
    try {
      const nevenements = await this.getAllNEvenements();
      this.eventEmitter.emit(nevenements);  
    } catch (error) {
      console.error('Error fetching events', error);
    }
  }

  public async createNEvenement(nevenementCreated: NEvenementCreationModel): Promise<NEvenementModel> {
    const url: string = `${CONST_API.URL_API}/NEvenement/create`;
    try {
      const response: any = await firstValueFrom(this.http.post(url, nevenementCreated, {responseType: 'json'}))

      return response as NEvenementModel
    } catch (error) {
      throw error;
    }
  }

  public async updateNEvenement(updatedNEvenement?: { nEvenementDate: string; nEvenementName: string; nEvenementDescription: string; posLat: number; posLong: number; positif: boolean; organisateur_Id: number; nIcon_Id: number; recompense_Id: number; bonus_Id: number; mediaItem_Id: number; nEvenement_Id: number; }): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }

  public async deleteNEvenement(nEvenement_Id: number): Promise<void> {
    const url: string = `${CONST_API.URL_API}/Activity/delete/${nEvenement_Id}`;

    try {
      await firstValueFrom(this.http.delete(url, {responseType: 'json'}));
      console.log(`Event with ID ${nEvenement_Id} deleted successfully`)
    } catch (error) {
      throw new Error('Error deleting event: ${error}')
    }
  }
  public getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl); //Appel HTTP GET
  }

  public saveNEvenement(evenement: NEvenementModel): Promise<NEvenementModel> {
    return this.http.post<NEvenementModel>(`${this.apiUrl}/evenements`, evenement).toPromise();
  }
}
