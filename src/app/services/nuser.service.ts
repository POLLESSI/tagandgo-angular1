import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { NUserModel } from '../models/nuser/nuser.model';
import { CONST_API } from '../constants/api-constants';
import { NUserCreationModel } from '../models/nuser/nuserCreation.model';

@Injectable({
  providedIn: 'root'
})
export class NuserService {

  private eventEmitter: EventEmitter<NUserModel[]> = new EventEmitter();  

  constructor(private http: HttpClient) {
    this.initializeConnections();
  }

  private initializeConnections(): void {
    this.eventEmitter.subscribe((nUsers: NUserModel[]) => {
      console.log('Event received', nUsers);
    });
  } 
  
  public addListener(listener: (nUsers: NUserModel[]) => void): void {
    this.eventEmitter.subscribe(listener);
  } 

  public emitEvent(nUsers: NUserModel[]): void {
    this.eventEmitter.emit(nUsers); 
  }

  public async getAllNUsers(): Promise<Array<NUserModel>> {
    const url: string = `${CONST_API.URL_API}/NUser`;
    return this.http.get(url, { responseType: 'json'}).toPromise() as Promise<NUserModel[]>;
  }

  //Méthode pour émettre des événements après avoir récupéré les utilisateurs 
  public async fetchAndEmitNUsers(): Promise<void> {
    try {
      const nUsers = await this.getAllNUsers();
      this.emitEvent(nUsers); 
    } catch (error) {
      console.error('Error fetching users', error);
    }
  }

  public async createNUser(nuserCreated: NUserCreationModel): Promise<NUserModel> {
    const url: string = `${CONST_API.URL_API}/NUser/create`;
    try {
      const response: any = await firstValueFrom(this.http.post(url, nuserCreated, {responseType: 'json'}))

      return response as NUserModel

    } catch (error) {
      throw error;
    }
  }

  public async updateNUser(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }

  public async deleteNUser(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }
}
