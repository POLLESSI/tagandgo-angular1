import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { AvatarModel } from '../models/avatar/avatar.model';
import { CONST_API } from '../constants/api-constants';
import { AvatarCreationModel } from '../models/avatar/avatarCreation.model';
import { AvatarEditionModel } from '../models/avatar/avatarEdition.model';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  private apiUrl = 'https://localhost:7069/api/avatars';
  private HubConnection!: signalR.HubConnection;
  private eventEmitter: EventEmitter<AvatarModel[]> = new EventEmitter();
  
  constructor(private http: HttpClient) { 
    this.initializeConnections();
  }

  private initializeConnections(): void {
    this.eventEmitter = new EventEmitter();
    this.HubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7069/hub/avatars')
      .configureLogging(LogLevel.Information)
      .build();

      this.HubConnection
        .start()
        .then(() => console.log('signalR connection started.'))
        .catch(err => console.error('SignalR connection error:', err));

      this.registerHubEvents();
  }

  public addListener(listener: (avatars: AvatarModel[]) => void): void {
    this.eventEmitter.subscribe(listener);
  }

  public emitEvent(avatars: AvatarModel[]): void {
    this.eventEmitter.emit(avatars);
  }

  public async getAllAvatars(): Promise<Array<AvatarModel>> {
    const url: string = `${CONST_API.URL_API}/Avatar`;
    try {
      const respons: any = await firstValueFrom(this.http.get(url, { responseType: 'json' }));
      return respons as Array<AvatarModel>;
    } catch (error) {
      throw new Error(`Error getting avatar: ${error}`);
    }
  }
  // Méthode pour émettre des évenements après avoir récupéré les avatars
  public async fetchAndEmitAvatars(): Promise<void> {
    try {
      const avatars = await this.getAllAvatars();
      this.emitEvent(avatars);
    } catch (error) {
      console.error('Error fetching avatars:', error);
    }
  }

  private startSignalRConnection(): void {
    this.HubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost: 7069/hub/avatars')
      .configureLogging(LogLevel.Information)
      .build();

    this.HubConnection
      .start()
      .then(() => console.log('SignalR connection started.'))
      .catch(err => console.error('SignalR connection error:', err));

    this.registerHubEvents();
  }

  private registerHubEvents(): void {
    this.HubConnection.on('Avatar Created', (avatar: AvatarModel) => {
      console.log('New avatar created :', avatar);
    });

    this.HubConnection.on('Avatar Updated', (avatar: AvatarModel) => {
      console.log('Avatar updated :', avatar);
    });
    this.HubConnection.on('Avatar Deleted', (id: number) => {
      console.log('Avatar deleted with ID : ${avatar_Id}');
    })
  }

  public stopSignalRConnection(): void {
    this.HubConnection
      .stop()
      .then(() => console.log('SignalR connection stopped.'))
      .catch(err => console.error('Error stopping SignalR:', err));
  }

  public async createAvatar(avatarCreated: AvatarCreationModel): Promise<AvatarModel>  {
    const url: string = `${CONST_API.URL_API}/Avatar/create`;

    try {
      const respons: any = await firstValueFrom(this.http.post(url, avatarCreated, {responseType: 'json'}));

      return respons as AvatarModel

    } catch (error) {
      throw error;
    }
  }

  public async updateAvatar(avatarUpdated: AvatarEditionModel): Promise<Observable<AvatarEditionModel>>  {

    try {
      const url: string = `${CONST_API.URL_API}/Avatar/update`;

      console.log("UPDATE : ", url, avatarUpdated);

      return this.http.put<AvatarModel>(url, avatarUpdated, { responseType: 'json'});
    } catch (error) {
      throw error;
    }
  }

  public async deleteAvatar(avatar_Id: number): Promise<void>  {
    const url: string = `${CONST_API.URL_API}/Avatar/delete/${avatar_Id}`;

    try {
      await firstValueFrom(this.http.delete(url, {responseType: 'json'}));
      console.log(`Avatar with ID ${avatar_Id} deleted successfully`)
    } catch (error) {
      throw new error('Error deleting activity: ${error}');
    }
  }
}
function from(promise: Promise<AvatarModel[]>): Observable<AvatarModel[]> {
  throw new Error('Function not implemented');
}