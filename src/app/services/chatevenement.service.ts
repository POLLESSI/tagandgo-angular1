import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ChatEvenementModel } from '../models/chatEvenement/chatEvenement.model';
import { CONST_API } from '../constants/api-constants';
import { ChatEvenementCreationModel } from '../models/chatEvenement/chatEvenementCreation.model';


@Injectable({
  providedIn: 'root'
})
export class ChatEvenementService {

  constructor(private http: HttpClient) { }

  public async getAllChats(): Promise<Array<ChatEvenementModel>> {
    const url: string = `${CONST_API.URL_API}/Chat`;

    try {
      const respons: any = await firstValueFrom(this.http.get(url, {responseType: 'json'}));

      return respons as Array<ChatEvenementModel>
    } catch (error) {
      throw error;
    }
  }
  
  public async createChat(chatCreated: ChatEvenementCreationModel): Promise<ChatEvenementModel> {
    const url: string = `${CONST_API.URL_API}/ChatEvenement/create`;

    try {
      const response: any = await firstValueFrom(this.http.post(url, chatCreated, {responseType: 'json'}))

      return response as ChatEvenementModel
    } catch (error) {
      throw error;
    }
  }

  public async deleteChat(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }
}
