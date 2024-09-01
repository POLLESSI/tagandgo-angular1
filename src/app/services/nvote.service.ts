import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { NVoteModel } from '../models/nvote.model';
import { CONST_API } from '../constants/api-constants';

@Injectable({
  providedIn: 'root'
})
export class NvoteService {

  constructor(private http: HttpClient) { }

  public async getAllNVotes(): Promise<Array<NVoteModel>> {
    const url: string = `${CONST_API.URL_API}/NVote`;

    try {
      const respons: any = await firstValueFrom(this.http.get(url, { responseType: 'json'}));

      return respons as Array<NVoteModel>
    } catch (error) {
      throw error;
    }
  }

  public async createNVote(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }

  public async deleteNVote(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }
}
