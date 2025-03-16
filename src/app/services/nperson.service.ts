import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { NPersonModel } from '../models/nperson/nperson.model';
import { CONST_API } from '../constants/api-constants';
import { NPersonCreationModel } from '../models/nperson/npersonCreation.model';

@Injectable({
  providedIn: 'root'
})
export class NpersonService {
  private eventEmitter: EventEmitter<NPersonModel[]> = new EventEmitter();

  constructor(private http: HttpClient) { 
    this.initializeConnections();
  }

  private initializeConnections(): void { 
    this.eventEmitter.subscribe((nPersons: NPersonModel[]) => {
      console.log('Event received', nPersons);
    });
  }

  public addListener(listener: (nPersons: NPersonModel[]) => void): void {
    this.eventEmitter.subscribe(listener);
  }

  public emitEvent(nPersons: NPersonModel[]): void {
    this.eventEmitter.emit(nPersons);
  }

  public async getAllNPersons(): Promise<Array<NPersonModel>> {
    const url: string = `${CONST_API.URL_API}/NPerson`;
    return this.http.get(url, { responseType: 'json'}).toPromise() as Promise<NPersonModel[]>;
  }

  // Methode pour emettre des événements après avoir récupérer les personnes
  public async fetchAndEmitNPersons(): Promise<void> {
    try {
      const nPersons = await this.getAllNPersons();
      this.emitEvent(nPersons);   
    } catch (error) {
      console.error('Error fetching persons', error);
    }
  } 
  public async createNPerson(npersonCreated: NPersonCreationModel): Promise<NPersonModel> {
    const url: string = `${CONST_API.URL_API}/NPerson/create`;
    try {
      const response: any = await firstValueFrom(this.http.post(url, npersonCreated, {responseType: 'json'}))

      return response as NPersonModel

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
