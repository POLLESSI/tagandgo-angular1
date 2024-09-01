import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ChatModel } from '../models/chat.model';
import { CONST_API } from '../constants/api-constants';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  public async getAllChats(): Promise<Array<ChatModel>> {
    const url: string = `${CONST_API.URL_API}/Chat`;

    try {
      const respons: any = await firstValueFrom(this.http.get(url, {responseType: 'json'}));

      return respons as Array<ChatModel>
    } catch (error) {
      throw error;
    }
  }
  
  public async createChat(): Promise<void> {
    try {

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
