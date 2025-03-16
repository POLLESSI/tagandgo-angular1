import { Injectable, OnDestroy } from "@angular/core";
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { Subject, BehaviorSubject } from 'rxjs';
import { ActivityModel } from "../models/activity/activity.model";
import { AvatarModel } from "../models/avatar/avatar.model";
import { BonusModel } from "../models/bonus/bonus.model";
import { NEvenementModel } from "../models/nevenement/nevenement.model";
import { environment } from "src/environments/environment.prod";
import { EventEmitter } from "@angular/core";
import { RecompenseModel } from "../models/recompense/recompense.model";

@Injectable({
    providedIn: 'root',
})
export class SignalRService implements OnDestroy {
    private eventEmitter: EventEmitter<NEvenementModel[]> = new EventEmitter();
    private hubConnection: signalR.HubConnection;
    private recompenseSubject = new Subject<RecompenseModel[]>();

    recompense$ = this.recompenseSubject.asObservable();
    private isStartingConnection = false;
    
    public activityUpdated = new Subject<void>();
    public evenementUpdated = new Subject<void>();

    private activityHubConnection: signalR.HubConnection;
    private avatarHubConnection: signalR.HubConnection;
    private bonusHubConnection: signalR.HubConnection;
    private nEvenementConnection: signalR.HubConnection;
    private isStartingActivityHubConnection = false;
    private isStartingAvatarHubConnection = false;
    private isStartingBonusHubConnection = false;
    private isStartingNEvenementConnection = false;

    // SUBJECTS

    private activitySubject = new BehaviorSubject<ActivityModel[]>([]);
    private evenementSubject = new BehaviorSubject<NEvenementModel[]>([]);
    private avatarSubject = new BehaviorSubject<AvatarModel[]>([]);
    private bonusSubject = new BehaviorSubject<BonusModel[]>([]);
    private eventSubject = new BehaviorSubject<NEvenementModel[]>([]);

    public activities$ = this.activitySubject.asObservable();
    public evenements$ = this.evenementSubject.asObservable();
    
    // PENDING

    private pendingSubscriptions:(() => void)[] = [];
    private pendingActivityHubSubscriptions: (() => void)[] = [];
    private pendingAvatarHubSubscriptions: (() => void)[] = [];
    private pendingBonusHubSubscriptions: (() => void)[] = [];
    private pendingNEvenementHubSubscriptions: (() => void)[] = []; 
    recompenseHubConnection: any;

    constructor() {
        this.initializeConnections();
        this.addConnectionListeners();
        this.addActivityHubConnectionListeners();
        this.addAvatarHubConnectionListeners();
        this.addBonusHubConnectionListeners();
        // this.addChatActivityHubConnectionListeners();
        // this.addChatEvenementHubConnectionListeners();
        // this.addmapHubConnectionListeners();
        // this.addMediaItemHubconnectionListeners();
        this.addNEvenementHubConnectionListeners();
        // this.addNIconHubConnectionListeners();
        // this.addNPersonHubConnectionListeners();
        // this.addNUserHubConnectionListeners();
        // this.addNVoteHubConnectionListeners();
        // this.addOrganisateurHubConnectionListeners();
        // this.addRecompenseHubConnectionListeners();
        // this.addWeatherForecastHubConnectionListeners();

        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${environment.apiUrl}/hubs/recompense`, {
                withCredentials: true,
                transport: signalR.HttpTransportType.WebSockets |
                           signalR.HttpTransportType.ServerSentEvents |
                           signalR.HttpTransportType.LongPolling
            })
            .withAutomaticReconnect([0, 2000, 10000, 30000])
            .configureLogging(signalR.LogLevel.Debug)
            .build();
            
        this.startConnection();
        this.startActivityHubConnection();
        this.startAvatarHubConnection();
        this.startBonusHubConnection();
        // this.startChatActivityHubConnection();
        // this.startChatEvenementHubConnection();
        // this.startMapHubConnection();
        // this.startMediaItemHubConnection();
        this.startNEvenementHubConnection();
        // this.startNIconHubConnection();
        // this.startNPersonHubConnection();
        // this.startNUserHubConnection();
        // this.startNVoteHubConnection();
        // this.startOrganisateurHubConnection();
        // this.startRecompenseHubConnection();
        // this.startWeatherForecastHubConnection();
    }
    
    private initializeConnections(): void {
        // this.hubConnection = new signalR.HubConnectionBuilder()
        //     .withUrl('https://localhost:7069/hubs/main', {
        //         withCredentials: true,
        //         transport: signalR.HttpTransportType.WebSockets |
        //                    signalR.HttpTransportType.ServerSentEvents |
        //                    signalR.HttpTransportType.LongPolling
        //     })
        //     .withAutomaticReconnect([0, 2000, 10000, 30000])
        //     .configureLogging(signalR.LogLevel.Debug)
        //     .build();
        this.activityHubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${environment.apiUrl}/hubs/activity`, {
                // 'https://localhost:7069/hubs/activity'
                withCredentials: true,
                transport: signalR.HttpTransportType.WebSockets |
                           signalR.HttpTransportType.ServerSentEvents |
                           signalR.HttpTransportType.LongPolling
            })
            .withAutomaticReconnect([0, 2000, 10000, 30000])
            .configureLogging(signalR.LogLevel.Debug)
            .build();

        this.avatarHubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${environment.apiUrl}/hubs/avatar`, {
                // 'https://localhost:7069/hubs/avatar'
                withCredentials: true,
                transport: signalR.HttpTransportType.WebSockets |
                           signalR.HttpTransportType.ServerSentEvents |
                           signalR.HttpTransportType.LongPolling
            })
            .withAutomaticReconnect([0, 2000, 10000, 30000])
            .configureLogging(signalR.LogLevel.Debug)
            .build();

        this.bonusHubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${environment.apiUrl}/hubs/bonus`, {
                // 'https://localhost:7069/hubs/bonus'
                withCredentials: true,
                transport: signalR.HttpTransportType.WebSockets |
                           signalR.HttpTransportType.ServerSentEvents |
                           signalR.HttpTransportType.LongPolling
            })
            .withAutomaticReconnect([0, 2000, 10000, 30000])
            .configureLogging(signalR.LogLevel.Debug)
            .build();

        this.nEvenementConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${environment.apiUrl}/hubs/nevenement`, {
                // 'https://localhost:7069/hubs/nevenement'
                withCredentials: true,
                transport: signalR.HttpTransportType.WebSockets |
                           signalR.HttpTransportType.ServerSentEvents |
                           signalR.HttpTransportType.LongPolling
            })
            .withAutomaticReconnect([0, 2000, 10000, 30000])
            .configureLogging(signalR.LogLevel.Debug)
            .build();
        this.startRecompenseHubConnection();
    }

    public async startRecompenseHubConnection(): Promise<void> {
        console.log('RecompenseHub connection state', this.recompenseHubConnection.state);
        if (this.isStartingConnection || this.recompenseHubConnection.state !== signalR.HubConnectionState.Disconnected) {
            console.warn('RecompenseHub connection is already active or being established.');
            return;
        }

        this.isStartingConnection = true;

        try {
            await this.recompenseHubConnection.start();
            console.log('RecompenseHub connection started.')
        } catch (err) {
            console.error('Error starting RecompenseHub connection:', err);
            setTimeout(() => this.startRecompenseHubConnection(), 5000);
        } finally {
            this.isStartingConnection = false;
        }
    }
    
    public addListener(listener: () => void): void {
        this.eventEmitter.subscribe(listener);
    }

    public emitEvent(events: NEvenementModel[]): void {
        this.eventEmitter.emit(events);
    }

    private addConnectionListeners() {
        // this.hubConnection.on('ReceiveActivityUpdate', (activity: ActivityModel) => {
        //     this.activitySubject.next(activity);
        // });

        // this.hubConnection.on('ActivityUpdated', (updatedActivity: ActivityModel) => {
        //     console.log('Received update activities from SignalR:', updatedActivity);
        //     this.activitySubject.next([...this.activitySubject.getValue(), updatedActivity]);
        // });

        this.hubConnection.onclose((error) => {
            console.warn('SignalR connection closed. Attempting to reconnect...', error);
            setTimeout(() => this.startConnection(), 5000);
        });

        this.hubConnection.onreconnecting((error) => {
            console.warn('SignalR connection lost, attempting to reconnect...', error);
        });

        this.hubConnection.onreconnected((connectionId) => {
            console.log('SignalR connection reestablished. Connected with ID:', connectionId);
        });
    }

    // Activities

    private addActivityHubConnectionListeners(): void {
        this.activityHubConnection.on('ReceiveActivityUpdate', (activity: ActivityModel) => {
            this.activitySubject.next([...this.activitySubject.getValue(), activity]);
        });

        this.activityHubConnection.on('ActivityUpdated', (updatedActivity: ActivityModel) => {
            console.log('Received update activities from ActivityHub:', updatedActivity);
            this.activitySubject.next([...this.activitySubject.getValue(), updatedActivity]);
        });

        this.activityHubConnection.onclose((error) => {
            console.warn('ActivityHub connection closed. Attempting to reconnect...', error);
            setTimeout(() => this.startActivityHubConnection(), 5000);
        });

        this.activityHubConnection.onreconnecting((error) => {
            console.warn('ActivityHub connection lost, attempting to reconnect...', error);
        });

        this.activityHubConnection.onreconnected((connectionId) => {
            console.log('ActivityHub connection reestablished. Connected with ID:', connectionId);
            //this.processPendingActivitySubscriptions();
        });
    }
    // processPendingActivitySubscriptions() {
    //     throw new Error("Method not implemented.");
    // }

    // Avatars
    private addAvatarHubConnectionListeners(): void {
        this.hubConnection.on('ReceiveAvatarUpdate', (avatar: AvatarModel) => {
            this.avatarSubject.next([...this.avatarSubject.getValue(), avatar]);
        });
        this.avatarHubConnection.on('updatedAvatar', (updatedAvatar: AvatarModel) => {
            console.log('Received update avatars from AvatarHub:', updatedAvatar);
            this.avatarSubject.next([...this.avatarSubject.getValue(), updatedAvatar]);
        });
        this.avatarHubConnection.onclose((error) => {
            console.warn('AvatarHub connection closed. Attempting to reconnect...', error);
            setTimeout(() => this.startAvatarHubConnection(), 5000);
        });

        this.avatarHubConnection.onreconnecting((error) => {
            console.warn('AvatarHub connection lost, attempting to reconnect...', error);
        });

        this.avatarHubConnection.onreconnected((connectionId) => {
            console.log('AvatarHub connection reestablished. Connected with ID:', connectionId);
            this.processPendingAvatarHubSubscriptions();
        });
    }
    // processPendingAvatarHubSubscriptions() {
    //     throw new Error("Method not implemented.");
    // }

    // Bonus
    private addBonusHubConnectionListeners(): void {
        this.bonusHubConnection.on('ReceiveBonusUpdate', (bonus: BonusModel) => {
            this.bonusSubject.next([...this.bonusSubject.getValue(), bonus]);
        });

        this.bonusHubConnection.on('BonusUpdated', (updatedBonus: BonusModel) => {
            console.log('Received updated bonus from BonusHub:', updatedBonus);
            this.bonusSubject.next([...this.bonusSubject.getValue(), updatedBonus]);
        });

        this.bonusHubConnection.onclose((error) => {
            console.warn('BonusHub connection closed. Attempting to reconnect...', error);
            setTimeout(() => this.startBonusHubConnection(), 5000);
        });

        this.bonusHubConnection.onreconnecting((error) => {
            console.warn('BonusHub connection lost, attempting to reconnect...', error);
        });

        this.bonusHubConnection.onreconnected((connectionId) => {
            console.log('BonusHub connection reestablished. Connected with ID:', connectionId);
            this.processPendingBonusHubSubscriptions();
        });
    }
    // processPendingBonusSubscriptions(){
    //     throw new Error("Method not implemented.");
    // }


    // ChatActivity


    // ChatEvenement


    // Maps


    // MediaItems


    // NEvenements
    private addNEvenementHubConnectionListeners(): void {
        this.nEvenementConnection.on('ReceiveNEvenementUpdate', (evenement: NEvenementModel) => {
            this.evenementSubject.next([...this.evenementSubject.getValue(), evenement]);
        });

        this.nEvenementConnection.on('NEvenementUpdated', (updatedEvenement: NEvenementModel) => {
            console.log('Received update events from NEvenementHub:', updatedEvenement);
            this.evenementSubject.next([...this.evenementSubject.getValue(), updatedEvenement]);
        });

        this.nEvenementConnection.onclose((error) => {
            console.warn('NEvenementHub connection closed. Attemping to reconnect...', error);
            setTimeout(() => this.startNEvenementHubConnection(), 5000);
        });

        this.nEvenementConnection.onreconnecting((error) => {
            console.warn('NEvenmentHub connection lost, attempting to reconnect...', error);
        });

        this.nEvenementConnection.onreconnected((connectionId) => {
            console.log('NEvenementHub connection reestablished. Connected with ID:', connectionId);
            this.processPendingNEvenementHubSubscriptions();
        });
    }
    // processPendingNEvenementSubsciptions() {
    //     throw new Error("Method not implemented.");
    // }


    // NIcons


    // NPersons


    // NUsers


    // NVotes


    // Organisateurs


    // Recompenses
    public addRecompenseListener(callback: (recompenses: RecompenseModel[]) => void): void {
        this.recompenseHubConnection.on('ReceiveRecompenses', (recompenses: RecompenseModel[]) => {
            this.recompenseSubject.next(recompenses);
            callback(recompenses);
        })
    }
    
    public emitRecompense(recompenses: RecompenseModel[]): void {
        this.hubConnection.invoke('SendRecompenses', recompenses)
            .catch(err => console.error(err));
    }

    // WeatherForecats


    // private addConnectionListeners() {
    //     this.hubConnection.onclose((error) => {
    //         console.warn('SignalR connection closed. Attempting to reconnect...', error);
    //         setTimeout(() => this.startConnection(), 5000);
    //     });

    //     this.hubConnection.onreconnecting((error) => {
    //         console.warn('SignalR connection lost, attempting to reconnect...', error);
    //     });

    //     this.hubConnection.onreconnected((connectionId) => {
    //         console.log('SignalR connection reestablished. Connected with ID:', connectionId);
    //     })
    // }

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
            console.debug('SignalR connection state:', this.hubConnection.state);
        } finally {
            this.isStartingConnection = false; //Libère le verrou
        } 
    }
    // START HUB CONNECTIONS
    // Activities
    public async startActivityHubConnection(): Promise<void> {
        console.log('ActivityHub connection state', this.activityHubConnection.state);
        if (this.isStartingActivityHubConnection || this.activityHubConnection.state !== signalR.HubConnectionState.Disconnected) {
            console.warn('ActivityHub connection is already active or being established.');
            return;
        }

        this.isStartingActivityHubConnection = true; // Active le verrou

        try {
            await this.activityHubConnection.start();
            console.log('ActivityHub connection started.');
            this.processPendingActivityHubSubscriptions();
            this.listenToActivityHubUpdates();
        } catch (err) {
            console.error('Error starting ActivityHub connection:', err);
            setTimeout(() => this.startActivityHubConnection(), 5000);
        } finally {
            this.isStartingActivityHubConnection = false; // Libére le verrou
        }
    }
    // listenToActivityHubUpdate() {
    //     throw new Error("Method not implemented.");
    // }
    // Avatars

    public async startAvatarHubConnection(): Promise<void> {
        console.log('AvatarHub connection state', this.avatarHubConnection.state);
        if (this.isStartingAvatarHubConnection || this.avatarHubConnection.state !== signalR.HubConnectionState.Disconnected) {
            console.warn('AvatarHub connection is already active or being established.');
            return;
        }

        this.isStartingAvatarHubConnection = true; // Active le verrou

        try {
            await this.avatarHubConnection.start();
            console.log('AvatarHub connection started.');
            this.processPendingAvatarHubSubscriptions(); // Traite les abonnements en attente
            this.listenToAvatarHubUpdates(); // Ajoute les abonnements ici
        } catch (err) {
            console.error('Error starting AvatarHub connection:', err);
            setTimeout(() => this.startAvatarHubConnection(), 5000);
        } finally {
            this.isStartingAvatarHubConnection = false; // Libère le verrou
        }
    }
    // listenToAvatarHubUpdates() {
    //     throw new Error("Method not implemented.");
    // }
    // Bonus

    public async startBonusHubConnection(): Promise<void> {
        console.log('BonusHub connection state', this.bonusHubConnection.state);
        if (this.isStartingBonusHubConnection || this.bonusHubConnection.state !== signalR.HubConnectionState.Disconnected) {
            console.warn('BonusHub connection is already active or being established.');
            return;
        }

        this.isStartingBonusHubConnection = true; // Active le verrou

        try {
            await this.bonusHubConnection.start();
            console.log('BonusHub connection started.');
            this.processPendingBonusHubSubscriptions(); // Traite les abonnements en attente
            this.listenToBonusHubUpdates(); // Ajoute les abonnements ici
        } catch (err) {
            console.error('Error starting BonusHub connection:', err);
            setTimeout(() => this.startBonusHubConnection(), 5000);
        } finally {
            this.isStartingBonusHubConnection = false; // Libère le verrou
        }
    }
    // listenToBonusHubUpdates() {
    //     throw new Error("Method not implemented.");
    // }


    // ChatActivity


    // ChatEvenement


    // Maps


    // MediaItems


    // NEvenements
    public async startNEvenementHubConnection(): Promise<void> {
        console.log('NEvenementHub connection state', this.nEvenementConnection.state);
        if (this.isStartingNEvenementConnection || this.nEvenementConnection.state !== signalR.HubConnectionState.Disconnected) {
            console.warn('NEvenementHub connection is already active or being established.');
            return;
        }
        this.isStartingNEvenementConnection = true; // Active le verrou

        try {
            await this.nEvenementConnection.start();
            console.log('NEvenementHub connection started.');
            this.processPendingNEvenementHubSubscriptions();
            this.listenToNEvenementHubUpdates();
        } catch (err) {
            console.error('Error starting NEvenementHub connection:', err);
            setTimeout(() => this.startNEvenementHubConnection(), 5000);
        } finally {
            this.isStartingNEvenementConnection = false; // Libère le verrou
        }
    }
    // listenToNEvenementHubUpdates() {
    //     throw new Error("Method not implemented.");
    // }


    // NIcons


    // NPersons


    // NUsers


    // NVotes


    // Organisateurs


    // Recompenses


    // WeatherForecasts


    // PENDING SUBSCRIPTIONS
    private processPendingSubscriptions(): void {
        if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
            this.pendingSubscriptions.forEach(subscription => subscription());
            this.pendingSubscriptions = [];
        }
    }
    // Activities
    private processPendingActivityHubSubscriptions(): void {
        if (this.activityHubConnection.state === signalR.HubConnectionState.Connected) {
            this.pendingActivityHubSubscriptions.forEach(subscription => subscription());
            this.pendingActivityHubSubscriptions = [];
        }
    }
    // Avatars
    private processPendingAvatarHubSubscriptions(): void {
        if (this.avatarHubConnection.state === signalR.HubConnectionState.Connected) {
            this.pendingAvatarHubSubscriptions.forEach(subscription => subscription());
            this.pendingAvatarHubSubscriptions = [];
        }
    }

    // Bonus
    private processPendingBonusHubSubscriptions(): void {
        if (this.bonusHubConnection.state === signalR.HubConnectionState.Connected) {
            this.pendingBonusHubSubscriptions.forEach(subscription => subscription());
            this.pendingBonusHubSubscriptions = [];
        }
    }

    // NEvenements
    private processPendingNEvenementHubSubscriptions(): void {
        if (this.nEvenementConnection.state === signalR.HubConnectionState.Connected) {
            this.pendingNEvenementHubSubscriptions.forEach(subscription => subscription());
            this.pendingNEvenementHubSubscriptions = [];
        }
    }

    // public async startConnection(): Promise<void> {
    //     if (this.isStartingConnection || this.hubConnection.state !== signalR.HubConnectionState.Disconnected) {
    //         return;
    //     }
        
    //     this.isStartingConnection = true;
    //     try {
    //         await this.hubConnection.start();
    //         console.log('SignalR connection started.');
    //     } catch (err) {
    //         console.error('Error starting SignalR connection: ', err);
    //         setTimeout(() => this.startConnection(), 5000);
    //     } finally {
    //         this.isStartingConnection = false;
    //     }
    // }

    // LISTENERS
    // Activities
    public listenToActivityHubUpdates(): void {
        this.activityHubConnection.on('ActivityUpdated', (updatedActivity: ActivityModel) => {
            console.log('Received update activities from ActivityHub:', updatedActivity);
            this.activitySubject.next([...this.activitySubject.getValue(), updatedActivity]);
        });
    }

    // Avatars
    public listenToAvatarHubUpdates(): void {
        this.avatarHubConnection.on('AvatarUpdated', (updatedAvatar: AvatarModel) => {
            console.log('Received updated avatars from AvatarHub:', updatedAvatar);
            this.avatarSubject.next([...this.avatarSubject.getValue(), updatedAvatar]);
        });
    }

    // Bonus
    public listenToBonusHubUpdates(): void {
        this.bonusHubConnection.on('BonusUpdated', (updatedBonus: BonusModel) => {
            console.log('Received updated bonus from BonusHub:', updatedBonus);
            this.bonusSubject.next([...this.bonusSubject.getValue(), updatedBonus]);
        });
    }

    // NEvenements
    public listenToNEvenementHubUpdates(): void {
        this.nEvenementConnection.on('NEvenementUpdated', (updatedEvenement: NEvenementModel) => {
            console.log('Received updated events from NEvenementHub:', updatedEvenement);
            this.evenementSubject.next([...this.evenementSubject.getValue(), updatedEvenement]);
        });
    }

    // Alls
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

    // SEND UPDATES
    // Activities

    public sendActivityUpdate(activity: ActivityModel): void {
        if (this.activityHubConnection.state !== signalR.HubConnectionState.Connected) {
            console.error('Cannot send activity update; SignalR connection is not established');
            return;
        }
        this.activityHubConnection.invoke('UpdateActivity', activity)
            .then(() => console.log('Activity update sent'))
            .catch(err => console.error('Error sending activity update: ', err));
    }
    // Avatars

    public sendAvatarUpdate(avatar: AvatarModel): void {
        if (this.avatarHubConnection.state !== signalR.HubConnectionState.Connected) {
            console.error('Cannot send avatar update; AvatarHub connection is not established');
            return;
        }
        this.avatarHubConnection.invoke('UpdateAvatar', avatar)
            .then(() => console.log('Avatar update sent'))
            .catch(err => console.error('Error sending avatar update: ', err));
    }
    // Bonus
    public sendBonusUpdate(bonus: BonusModel): void {
        if (this.bonusHubConnection.state !== signalR.HubConnectionState.Connected) {
            console.error('Cannot send bonus update; BonusHub connection is not established');
            return;
        }
        this.bonusHubConnection.invoke('UpdateBonus', bonus)
            .then(() => console.log('Bonus update sent'))
            .catch(err => console.error('Error sending bonus update: ', err));
    }
    // Nevenements

    public sendNEvenementUpdate(evenement: NEvenementModel): void {
        if (this.nEvenementConnection.state !== signalR.HubConnectionState.Connected) {
            console.error('Cannot send event update; SignalR connection is not established');
            return;
        }
        this.nEvenementConnection.invoke('SendEvenementUpdate', evenement)
            .then(() => console.log('Event update sent'))
            .catch(err =>console.error('Error sending event update: ',err));
    }
    
    // UPDATES
    public updateActivities(activities: ActivityModel[]): void {
        this.activitySubject.next(activities);
        if (this.activityHubConnection.state !== signalR.HubConnectionState.Connected) {
            console.error('SignalR connection is not established');
            return;
        }
        this.activityHubConnection.invoke('UpdateActivities', activities)
            .catch(error => console.error('Error updating activities:', error));
    }

    public updateEvenements(evenements: NEvenementModel[]): void {
        this.evenementSubject.next(evenements);
        if (this.nEvenementConnection.state !== signalR.HubConnectionState.Connected) {
            console.error('SignalR connection is not established');
            return;
        }
        this.nEvenementConnection.invoke('UpdateNEvenements', evenements)
            .catch(error => console.error('Error updating events:', error));
    }
    // Activities
    public onActivityUpdate(callback: (updatedActivity: ActivityModel) => void): void {
        const subscription = () => {
            //Nettoye l'ancien gestionnaire pour éviter les doublons.
            this.activityHubConnection.off('ActivityUpdate'); //Supprime les gestionnaires précédents
            this.activityHubConnection.on('ActivityUpdate', (updatedActivity : ActivityModel) => {
                console.log('ActivityUpdated event received:', updatedActivity);
                callback(updatedActivity);
            });
        };

        if (this.activityHubConnection.state === signalR.HubConnectionState.Connected) {
            subscription();
        } else {
            console.warn('SignalR connection not ready. Adding to pending subscriptions.');
            this.pendingSubscriptions.push(subscription);
        }
    }

    // Avatars

    public onAvatarUpdate(callback: (updatedAvatar: AvatarModel) => void): void {
        const subscription = () => {
            this.avatarHubConnection.off('AvatarUpdate'); // Supprime les gestionnaires précédents
            this.avatarHubConnection.on('AvatarUpdate', (updatedAvatar: AvatarModel) => {
                console.log('AvatarUpdated event received:', updatedAvatar);
                callback(updatedAvatar);
            });
        };

        if (this.avatarHubConnection.state === signalR.HubConnectionState.Connected) {
            subscription();
        } else {
            console.warn('AvatarHub connection not ready. Adding to pending subscriptions.');
            this.pendingAvatarHubSubscriptions.push(subscription);
        }
    }

    // Bonus

    public onBonusUpdate(callback: (updatedBonus: BonusModel) => void): void {
        const subscription = () => {
            this.bonusHubConnection.off('BonusUpdate'); // Supprime les gestionnaires précédents
            this.bonusHubConnection.on('BonusUpdate', (updatedBonus: BonusModel) => {
                console.log('BonusUpdated event received:', updatedBonus);
                callback(updatedBonus);
            });
        };

        if (this.bonusHubConnection.state === signalR.HubConnectionState.Connected) {
            subscription();
        } else {
            console.warn('BonusHub Connection not ready. Adding to pending subscriptions.');
            this.pendingBonusHubSubscriptions.push(subscription);
        }
    }

    // NEvenements

    // public onNEvenementUpdate(callback: (updatedNEvenement: NEvenementModel) => void): void {
    //     const subscription = () => {
    //         // Nettoie l'ancien gestionnaire pour éviter les doublons. 
    //         this.nEvenementConnection.off('NEvenementUpdate'); // Supprime les gestionnaires précédents
    //         this.nEvenementConnection.on('NEvenementUpdate', (updatedNEvenement : NEvenenementModel) => {
    //             console.log('NEvenementUpdated event received:', updatedNEvenement);
    //             callback(updatedNEvenement);
    //         });
    //     };

    //     if (this.nEvenementConnection.state === signalR.HubConnectionState.Connected) {
    //         subscription();
    //     } else {
    //         console.warn('SignalR connection not ready. Adding to pending subscriptions.');
    //         this.pendingSubscriptions.push(subscription);
    //     }
    // }

    
     // NGONDESTROY
    ngOnDestroy(): void {
        this.stopConnection();
        this.stopActivityHubConnection();
        this.stopAvatarHubConnection();
        this.stopBonusHubConnection();
        this.stopNEvenementHubConnection();

        this.stopRecompenseHubConnection();
    }

    // STOP CONNECTIONS
    public stopConnection(): void {
        if (this.hubConnection.state !== signalR.HubConnectionState.Disconnected) {
            this.hubConnection.stop()
                .then(() => console.log('SignalR connection stopped.'));
        }
    }
    // Activities
    public async stopActivityHubConnection(): Promise<void> {
        if (this.activityHubConnection.state !== signalR.HubConnectionState.Disconnected) {
            try {
                await this.activityHubConnection.stop();
                console.log('ActivityHub connection stopped.');
            } catch (err) {
                console.error('Error stopping activityHub connection: ', err);
            }
        }
    }

    // Avatars
    public async stopAvatarHubConnection(): Promise<void> {
        if (this.avatarHubConnection.state !== signalR.HubConnectionState.Disconnected) {
            try {
                await this.avatarHubConnection.stop();
                console.log('AvatarHub connection stopped.');
            } catch (err) {
                console.error('Error stopping avatarHub connection: ', err);
            }
        }
    }

    // Bonus
    public async stopBonusHubConnection(): Promise<void> {
        if (this.bonusHubConnection.state !== signalR.HubConnectionState.Disconnected) {
            try {
                await this.bonusHubConnection.stop();
                console.log('BonusHub connection stopped.');
            } catch (err) {
                console.error('Error stopping bonusHub connection: ', err);
            }
        }
    }

    // ChatActivity

    // NEvenements
    public async stopNEvenementHubConnection(): Promise<void> {
        if (this.nEvenementConnection.state !== signalR.HubConnectionState.Disconnected) {
            try {
                await this.nEvenementConnection.stop();
                console.log('NEvenementHub connection stopped.');
            } catch (err) {
                console.error('Error stopping NEvenementHub connection: ', err);
            }
        }

    }

    // Recompenses

    public stopRecompenseHubConnection(): void {
        if (this.recompenseHubConnection.state !== signalR.HubConnectionState.Disconnected) {
            this.recompenseHubConnection.stop()
                .then(() => console.log('RecompenseHub connection stopped.'));
        }
    }


    // public async stopConnection(): Promise<void> {
    //     if (this.hubConnection.state !== signalR.HubConnectionState.Disconnected) {
    //         try {
    //             await this.hubConnection.stop();
    //             console.log('SignalR connection stopped.');
    //         } catch (err) {
    //             console.error('Error stopping connection:', err);
    //         }
    //     }
    // }

    // MARKERS

    public onMarkerUpdate(callback: (activityId: number, markerData: ActivityModel) => void): void {
        const subscription = () => {
            this.hubConnection.off('MarkerUpdate'); // Supprime le gestionnaire précédent.
            this.hubConnection.on('MarkerUpdate', (activityId: number, markerData: ActivityModel) => {
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

    public sendMarkerUpdate(activityId: string, markerData: ActivityModel): void {
        if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
            this.hubConnection.invoke('BroadcastMarkerUpdate', activityId, markerData)
                .then(() => console.log('Marker update sent successfully.'))
                .catch(err => console.error('Error sending marker update: ', err));
        } else {
            console.error('Cannot send marker update; SignalR connection not established.');
        }      
    }

    public onEventUpdate(callback: (event: NEvenementModel[]) => void): void {
        this.eventSubject.asObservable().subscribe(callback);
    }

    // public onNEvenementUpdate(callback: (evenement: NEvenementModel) => void): void {
    //     this.nEvenementConnection.on('ReceiveNEvenementUpdate', callback);
    // }

    public emitEventUpdate(updatedEvent: NEvenementModel): void {
        if (this.nEvenementConnection.state === signalR.HubConnectionState.Connected) {
            this.nEvenementConnection.invoke('NotifyEventUpdated', updatedEvent)
            .then(() => console.log('Event update sent via SignalR:', updatedEvent))
            .catch(err => console.error('Error sending event update', err));
        } else {
            console.error('Cannot emit event update; SignalR connection not established.')
        }
    }
}
