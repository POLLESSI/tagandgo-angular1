import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { NVoteModel } from '../models/nvote/nvote.model';
import { CONST_API } from '../constants/api-constants';
import { NVoteCreationModel } from '../models/nvote/nvoteCreation.model';

@Injectable({
  providedIn: 'root'
})
export class NvoteService {
  private eventEmitter: EventEmitter<NVoteModel[]> = new EventEmitter();

  constructor(private http: HttpClient) {
    this.initializeConnections();
  }

  private initializeConnections(): void {
    this.eventEmitter.subscribe((nVotes: NVoteModel[]) => {
      console.log('Event received', nVotes);
    });
  }

  public addListener(listener: (nVotes: NVoteModel[]) => void): void {
    this.eventEmitter.subscribe(listener);
  }

  public emitEvent(nVotes: NVoteModel[]): void {
    this.eventEmitter.emit(nVotes);
  }

  public async getAllNVotes(): Promise<Array<NVoteModel>> {
    const url: string = `${CONST_API.URL_API}/NVote`;
    return this.http.get(url, { responseType: 'json'}).toPromise() as Promise<NVoteModel[]>;
  }

  // Méthode pour émettre des événements après avoir récupéré les votes
  public async fetchAndEmitNVotes(): Promise<void> {
    try {
      const nVotes = await this.getAllNVotes();
      this.emitEvent(nVotes);
    } catch (error) {
      console.error('Error fetching votes', error);
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
