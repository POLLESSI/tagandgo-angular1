import { Injectable, OnDestroy } from "@angular/core";
import * as signalR from '@microsoft/signalr';
import { Subject, BehaviorSubject } from 'rxjs';
import { ActivityModel } from "../models/activity/activity.model";
import { NEvenementModel } from "../models/nevenement/nevenement.model";
import { CONST_API } from '../constants/api-constants';
@Injectable({
    providedIn: 'root',
})
export class SignalRService implements OnDestroy {
    private hubConnection: signalR.HubConnection;
    
    private activitySubject = new BehaviorSubject<ActivityModel[]>([]);
    private evenementSubject = new BehaviorSubject<NEvenementModel[]>([]);

    private eventSubject = new BehaviorSubject<any>(null);
    public activityUpdated = new Subject<void>();

    public activities$ = this.activitySubject.asObservable();
    public evenements$ = this.evenementSubject.asObservable();

    constructor() {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7069/activityHub')
            .withAutomaticReconnect()
            .build();
        this.createConnection();
        this.startConnection();
        //this.addUpdateListener();
    }

    private createConnection(): void {
        //Initialisation si la connexion est déconnectée
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7069/activityHub', {
                withCredentials: true,
                //skipNegotiation: true, 
                transport: signalR.HttpTransportType.WebSockets |
                           signalR.HttpTransportType.ServerSentEvents |
                           signalR.HttpTransportType.LongPolling,//Désactive WebSockets.
                //withCredentials: true //Inclut les cookies ou les tokens d'authentification
            })
            .withAutomaticReconnect([0, 2000, 10000, 30000]) //Délais de reconnection : immédiat, 2s, 10s, 30s
            .configureLogging(signalR.LogLevel.Debug)
            .build();

        this.addConnectionListeners();
    }

    private addConnectionListeners() {
        this.hubConnection.onclose((error) => {
            console.warn('SignalR connection closed. Attempting to reconnect...', error);
            setTimeout(() => this.startConnection(), 5000);
        });

        this.hubConnection.onreconnecting((error) => {
            console.warn('SignalR connection lost, attempting to reconnect...', error);
        });

        this.hubConnection.onreconnected((connetionId) => {
            console.log('SignalR connection reestablished. Connected with ID:', connetionId);
        });
    }

    public async startConnection(): Promise<void> {
        try {
            await this.hubConnection.start();
            console.log('SignalR connection started.');
        } catch (err) {
            console.error('Error starting SignalR connection:', err);
        }
        // if (this.hubConnection.state === signalR.HubConnectionState.Disconnected) {
        //     return this.hubConnection
        //         .start()
        //         .then(() => console.log('Hub Connection started'))
        //         .catch((err) => console.error('Error while starting connection:', err));
        // } else {
        //     console.warn('SignalR hub connection already started or in progress.');
        //     return Promise.resolve();
        // }
    }

    onActivityUpdate(callback: (updatedActivity: ActivityModel) => void): void {
        this.hubConnection.on('ActivityUpdated', callback);
        if (!this.hubConnection) {
            console.error('SignalR connection is not established');
            return;
        }

        this.hubConnection.on('ReceiveActivityUpdate', callback);
    }

    sendActivityUpdate(activity: ActivityModel): void {
        this.hubConnection.invoke('UpdateActivity', activity).catch(err =>
            console.error('Error sending activity update:', err)
        );
        if (!this.hubConnection) {
            console.error('SignalR connection is not established');
            return;
        }

        this.hubConnection
            .invoke('SendActivityUpdate', activity)
            .then(() => console.log('Activity update sent'))
            .catch(error => console.error('Error sending activity update', error));
    }

    public updateActivities(activities: ActivityModel[]): void {
        this.activitySubject.next(activities);
        if (!this.hubConnection) {
            console.error('SignalR connection is not established');
            return;
        }

        this.hubConnection
            .invoke('UpdateActivities', activities)
            .catch(error => console.error('Error updating activities:', error));
    }

    public async stopConnection(): Promise<void> {
        if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
            return this.hubConnection
                .stop()
                .then(() => console.log('Hub connection stopped.'))
                .catch((err) => console.error('Error while stopping SignalR connection:', err));
        }
        return Promise.resolve();
    }
    
    public onMarkerUpdate(callback: (activityId: number, markerData: any) => void): void {
        if (this.hubConnection.state !== signalR.HubConnectionState.Connected) {
            console.error('Cannot subscribe to MarkerUpdate; SignalR connection not established.');
            return;
        }
        this.hubConnection.on('MarkerUpdate', (activityId: number, markerdata: any) => {
            callback(activityId, markerdata);
        });
        this.hubConnection.on('ActivityUpdated', (updatedActivity: ActivityModel) => {
            console.log('Activity updated from SignalR:', updatedActivity);
            //this.activitySyncService.updateActivity(updatedActivity);
        })
    }

    public sendMarkerUpdate(activityId: string, markerData: any): void {
        if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
            this.hubConnection
                .invoke('BroadcastMarkerUpdate', activityId, markerData)
                .catch(err => console.error('Error sending marker update: ', err));
        } else {
            console.error('Cannot send marker update; SignalR connection not established.')
        }      
    }

    public onEventUpdate(callback: (event: any) => void): void {
        this.eventSubject.asObservable().subscribe(callback);
    }

    public emitEventUpdate(updatedEvent: any): void {
        if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
            this.hubConnection
            .invoke('NotifyEventUpdated', updatedEvent)
            .then(() => console.log('Event update sent via SignalR:', updatedEvent))
            .catch(err => console.error('Error sending event update', err));
        } else {
            console.error('Cannot emit event update; SignalR connection not established.')
        }
    }

    ngOnDestroy(): void {
        this.stopConnection();
    }

    public updateEvenements(evenements: NEvenementModel[]): void {
        this.evenementSubject.next(evenements);
    }

    public listenToSignalRUpdate(): void {
        this.hubConnection.on('ActivityUpdated', (updatedActivities: ActivityModel[]) => {
            console.log('Receive update activities from SignalR:', updatedActivities);
            this.updateActivities(updatedActivities);
        });

        this.hubConnection.on('NEvenementUpdated', (updateEvenements: NEvenementModel[]) => {
            console.log('Received updated events from SignalR:', updateEvenements);
            this.updateEvenements(updateEvenements);
        });
    }
}