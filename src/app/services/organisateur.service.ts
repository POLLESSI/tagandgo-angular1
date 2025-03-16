import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { OrganisateurModel } from '../models/organisateur/organisateur.model';
import { CONST_API } from '../constants/api-constants';
import { OrganisateurCreationModel } from '../models/organisateur/organisateurCreation.model';

@Injectable({
  providedIn: 'root'
})
export class OrganisateurService {
  private eventEmitter: EventEmitter<OrganisateurModel[]> = new EventEmitter();

  constructor(private http: HttpClient) { 
    this.initializeConnections();
  }

  private initializeConnections(): void { 
    this.eventEmitter.subscribe((organisateurs: OrganisateurModel[]) => {
      console.log('Event received', organisateurs);
    });
  }

  public addListener(listener: (organisateurs: OrganisateurModel[]) => void): void {
    this.eventEmitter.subscribe(listener);
  }

  public emitEvent(organisateurs: OrganisateurModel[]): void {
    this.eventEmitter.emit(organisateurs);
  }

  public async getAllOrganisateurs(): Promise<OrganisateurModel[]> {
    const url: string = `${CONST_API.URL_API}/Organisateur`;
    return this.http.get(url, { responseType: 'json'}).toPromise() as Promise<OrganisateurModel[]>;
  }

  // Méthode pour émettre des événements après avoir récupérer les organisateurs
  public async fetchAndEmitOrganisateurs(): Promise<void> {
    try {
      const organisateurs = await this.getAllOrganisateurs();
      this.emitEvent(organisateurs);   
    } catch (error) {
      console.error('Error fetching organisateurs', error);
    }
  }

  public async createOrganisateur(organisateurCreated: OrganisateurCreationModel): Promise<OrganisateurModel> {
    const url: string = `${CONST_API.URL_API}/Organisateur/create`;
    try {
      const response: any = await firstValueFrom(this.http.post(url, organisateurCreated, {responseType: 'json'}))

      return response as OrganisateurModel

    } catch (error) {
      throw error;
    }
  }

  public async updateOrganisateur(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }

  public async deleteOrganisateur(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }

 }
