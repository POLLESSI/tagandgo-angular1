import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private notifications: string[] = [];

    private notificationSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

    public notifications$: Observable<string | null> = this.notificationSubject.asObservable();

    constructor() {}

    addNotification(message: string): void {
        this.notifications.push(message);
        this.notificationSubject.next(message);
    }

    getLastNotification(): string | null {
        return this.notifications.length > 0 ? this.notifications[this.notifications.length -1] : null;
    }

    clearNotifications(): void {
        this.notifications = [];
        this.notificationSubject.next(null);
    }
}