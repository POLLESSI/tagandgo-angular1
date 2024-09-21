import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ChatActivityModel } from '../models/chatActivity/chatActivity.model';
import { CONST_API } from '../constants/api-constants';
import { ChatActivityCreationModel } from '../models/chatActivity/chatActivityCreation.model';


@Injectable({
  providedIn: 'root'
})
export class ChatActivityService {

  constructor(private http: HttpClient) { }

  public async getAllChats(): Promise<Array<ChatActivityModel>> {
    const url: string = `${CONST_API.URL_API}/Chat`;

    try {
      const respons: any = await firstValueFrom(this.http.get(url, {responseType: 'json'}));

      return respons as Array<ChatActivityModel>
    } catch (error) {
      throw error;
    }
  }
  
  public async createChat(chatCreated: ChatActivityCreationModel): Promise<ChatActivityModel> {
    const url: string = `${CONST_API.URL_API}/Chat/create`;

    try {
      const response: any = await firstValueFrom(this.http.post(url, chatCreated, {responseType: 'json'}))

      return response as ChatActivityModel
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
