import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { BonusModel } from '../models/bonus/bonus.model';
import { CONST_API } from '../constants/api-constants';
import { BonusCreationModel } from '../models/bonus/bonusCreation.model';

@Injectable({
  providedIn: 'root'
})
export class BonusService {
  private eventEmitter: EventEmitter<BonusModel[]> = new EventEmitter();
  
  constructor(private http: HttpClient) {
    this.initializeConnections();
 }

  private initializeConnections(): void {
    this.eventEmitter.subscribe((bonuss: BonusModel[]) => {
      console.log('Event received', bonuss);
    })
  }

  public addListener(listener: (bonuss: BonusModel[]) => void): void {
    this.eventEmitter.subscribe(listener);
  }

  public emitEvent(bonuss: BonusModel[]): void {
    this.eventEmitter.emit(bonuss);
  }

  public async getAllBonuss(): Promise<Array<BonusModel>> {
    const url: string = `${CONST_API.URL_API}/Bonus`;
    return this.http.get(url, {responseType: 'json'}).toPromise() as Promise<Array<BonusModel>>;
  }

  public async fetchAndEmitBonuss(): Promise<void> {
    try {
      const bonuss = await this.getAllBonuss();
      this.emitEvent(bonuss);
    } catch (error) {
      console.error('Error fetching bonuss:', error);
    }
  }

  public async createBonus(bonusCreated: BonusCreationModel): Promise<BonusModel> {
    const url: string = `${CONST_API.URL_API}/Bonus/create`;

    try {
      const response: any = await firstValueFrom(this.http.post(url, bonusCreated, {responseType: 'json'}))

    return response as BonusModel

    } catch (error) {
      throw error;
    }
  }

  public async deleteBonus(): Promise<void> {
    try {

    } catch (error) {
      throw error;
    }
  }
}
