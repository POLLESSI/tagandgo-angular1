import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { OrganisateurModel } from '../models/organisateur/organisateur.model';
import { CONST_API } from '../constants/api-constants';
import { OrganisateurCreationModel } from '../models/organisateur/organisateurCreation.model';

@Injectable({
  providedIn: 'root'
})
export class OrganisateurService {

  constructor(private http: HttpClient) { }

  public async getAllOrganisateurs(): Promise<Array<OrganisateurModel>> {
    const url: string = `${CONST_API.URL_API}/Organisateur`;

    try {
      const respons: any = await firstValueFrom(this.http.get(url, { responseType: 'json'}));

      return respons as Array<OrganisateurModel>
    } catch (error) {
      throw error;
    }
  }

  public async createOrganisateur(organisateur: OrganisateurCreationModel): Promise<void> {
    try {

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
