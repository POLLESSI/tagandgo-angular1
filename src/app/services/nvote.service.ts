import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { NVoteModel } from '../models/nvote/nvote.model';
import { CONST_API } from '../constants/api-constants';
import { NVoteCreationModel } from '../models/nvote/nvoteCreation.model';

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

  public async createNVote(nVoteCreated: NVoteCreationModel): Promise<NVoteModel> {
    const url: string = `${CONST_API.URL_API}/NVote/create`;
    try {
      const response: any = await firstValueFrom(this.http.post(url, nVoteCreated, {responseType: 'json'}))

      return response as NVoteModel

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
