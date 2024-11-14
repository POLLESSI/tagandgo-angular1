import { Injectable } from "@angular/core";
import * as signalR from '@microsoft/signalr';
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class SignalRService {
    private hubConnection: signalR.HubConnection;
    public activityUpdated = new Subject<void>();

    constructor() {
        // this.startConnection();
        //this.addUpdateListener();
    }
    // private startConnection(): void {
    //     this.hubConnection = new signalR.HubConnectionBuilder()
    //         .withUrl('https://localhost:7069/activityHub')
    //         .build();

    //     this.hubConnection
    //         .start()
    //         .then(() => console.log('SignalR connection established'))
    //         .catch((err) => console.error('Error while starting SignalR connection: ' + err));
    // }

    // private addUpdateListener(): void {
    //     this.hubConnection.on('notifynewactivity', () => {
    //         console.log('Received activity update notification');
    //         this.activityUpdated.next(); //Triggers the event
    //     });
    // }

    public stopConnection(): void {
        if (this.hubConnection) {
            this.hubConnection.stop().then(() => console.log('SignalR connection stopped'));
        }
    }
}