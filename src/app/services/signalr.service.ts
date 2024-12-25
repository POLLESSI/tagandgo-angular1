import { Injectable, OnDestroy } from "@angular/core";
import * as signalR from '@microsoft/signalr';
import { Subject, BehaviorSubject } from 'rxjs';
import { ActivityModel } from "../models/activity/activity.model";
import { NEvenementModel } from "../models/nevenement/nevenement.model";
//import { CONST_API } from '../constants/api-constants';
@Injectable({
    providedIn: 'root',
})
export class SignalRService implements OnDestroy {
    private hubConnection: signalR.HubConnection;
    private isStartingConnection = false;
    
    private activitySubject = new BehaviorSubject<ActivityModel[]>([]);
    private evenementSubject = new BehaviorSubject<NEvenementModel[]>([]);

    private eventSubject = new BehaviorSubject<any>(null);
    public activityUpdated = new Subject<void>();

    public activities$ = this.activitySubject.asObservable();
    public evenements$ = this.evenementSubject.asObservable();

    constructor() {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7069/activityhub', {
                withCredentials: true,
                transport: signalR.HttpTransportType.WebSockets |
                           signalR.HttpTransportType.ServerSentEvents |
                           signalR.HttpTransportType.LongPolling
            })
            .withAutomaticReconnect([0, 2000, 10000, 30000])
            .configureLogging(signalR.LogLevel.Debug)
            .build();

        this.addConnectionListeners();
        this.startConnection();
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
        console.log('SignalR connection state', this.hubConnection.state);
        if (this.isStartingConnection || this.hubConnection.state !== signalR.HubConnectionState.Disconnected) {
            console.warn('SignalR connection is already active or being established.');
            return;
        }
        
        this.isStartingConnection = true; //Active le verrou

        try {
            await this.hubConnection.start();
            console.log('SignalR connection started.');
            this.processPendingSubscriptions(); // Traite les abonnements en attente
            // Ajoute les abonnements ici
            this.listenToSignalRUpdate();
             
        } catch (err) {
            console.error('Error starting SignalR connection:', err);
            setTimeout(() => this.startConnection(), 5000);
            //console.debug('SignalR connection state:', this.hubConnection.state);
        } finally {
            this.isStartingConnection = false; //Libère le verrou
        }
        
    }

    private pendingSubscriptions:(() => void)[] = [];

    private processPendingSubscriptions(): void {
        if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
            this.pendingSubscriptions.forEach(subscription => subscription());
            this.pendingSubscriptions = [];
        }
    }

    public onActivityUpdate(callback: (updatedActivity: ActivityModel) => void): void {
        const subscription = () => {
            //Nettoye l'ancien gestionnaire pour éviter les doublons.
            this.hubConnection.off('ActivityUpdate'); //Supprime les gestionnaires précédents
            this.hubConnection.on('ActivityUpdate', (updatedActivity : ActivityModel) => {
                console.log('ActivityUpdated event received:', updatedActivity);
                callback(updatedActivity);
            });
        };

        if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
            subscription();
        } else {
            console.warn('SignalR connection not ready. Adding to pending subscriptions.');
            this.pendingSubscriptions.push(subscription);
        }
    }

    public sendActivityUpdate(activity: ActivityModel): void {
        if (this.hubConnection.state !== signalR.HubConnectionState.Connected) {
            console.error('Cannot send activity update; SignalR connection is not established');
            return;
        }
        this.hubConnection.invoke('UpdateActivity', activity)
            .then(() => console.log('Activity update sent'))
            .catch(err => console.error('Error sending activity update: ', err));
    }

    public sendNEvenementUpdate(evenement: NEvenementModel): void {
        if (this.hubConnection.state !== signalR.HubConnectionState.Connected) {
            console.error('Cannot send event update; SignalR connection is not established');
            return;
        }
        this.hubConnection.invoke('SendEvenementUpdate', evenement)
            .then(() => console.log('Event update sent'))
            .catch(err =>console.error('Error sending event update: ',err));
    }

    public updateActivities(activities: ActivityModel[]): void {
        this.activitySubject.next(activities);
        if (this.hubConnection.state !== signalR.HubConnectionState.Connected) {
            console.error('SignalR connection is not established');
            return;
        }
        this.hubConnection.invoke('UpdateActivities', activities)
            .catch(error => console.error('Error updating activities:', error));
    }

    public async stopConnection(): Promise<void> {
        if (this.hubConnection.state !== signalR.HubConnectionState.Disconnected) {
            try {
                await this.hubConnection.stop();
                console.log('SignalR connetcion stopped.');
            } catch (err) {
                console.error('Error stopping connection:', err);
            }
        }
    }

    public onMarkerUpdate(callback: (activityId: number, markerData: any) => void): void {

        const subscription = () => {
            this.hubConnection.off('MarkerUpdate'); // Supprime le gestionnaire précédent.
            this.hubConnection.on('MarkerUpdate', (activityId: number, markerData: any) => {
                console.log('MarkerUpdate event received:', { activityId, markerData });
                callback(activityId, markerData);
            });
            console.log('Subscribed to MarkerUpdate.');
        };

        if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
            subscription();
        } else {
            console.warn('SignalR connection not established. Adding subscription to queue.');
            this.pendingSubscriptions.push(subscription);
        }
    }

    public sendMarkerUpdate(activityId: string, markerData: any): void {
        if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
            this.hubConnection.invoke('BroadcastMarkerUpdate', activityId, markerData)
                .then(() => console.log('Marker update sent successfully.'))
                .catch(err => console.error('Error sending marker update: ', err));
        } else {
            console.error('Cannot send marker update; SignalR connection not established.');
        }      
    }

    public onEventUpdate(callback: (event: any) => void): void {
        this.eventSubject.asObservable().subscribe(callback);
    }

    public onNEvenementUpdate(callback: (evenement: NEvenementModel) => void): void {
        this.hubConnection.on('ReceiveNEvenementUpdate', callback);
    }

    public emitEventUpdate(updatedEvent: any): void {
        if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
            this.hubConnection.invoke('NotifyEventUpdated', updatedEvent)
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
        this.hubConnection.on('ActivityUpdated', (updatedActivity: ActivityModel) => {
            console.log('Receive update activities from SignalR:', updatedActivity);
            this.activitySubject.next([...this.activitySubject.getValue(), updatedActivity]);
        });

        this.hubConnection.on('NEvenementUpdated', (updateEvenements: NEvenementModel[]) => {
            console.log('Received updated events from SignalR:', updateEvenements);
            this.updateEvenements(updateEvenements);
        });
    }
}
