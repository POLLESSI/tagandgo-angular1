import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';

import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-notification-bar',
    template: `
    <div *ngIf="message$ | async as message" class="notification-bar">
      {{ message }}
    </div>
  `,
  
    styles: [`
      .notification-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #007bff;
        color: white;
        text-align: center;
        padding: 10px;
        z-index: 1000;
      }
    `]
})
export class NotificationBarComponent implements OnInit {
    currentNotification: string | null = null;
    message$ = new BehaviorSubject<string | null>(null);

    constructor(private notificationService: NotificationService) {}

    notify(message: string): void {
        this.message$.next(message);
        setTimeout(() => this.message$.next(null), 3000);
    }
    ngOnInit(): void {
      this.notificationService.notifications$.subscribe((message) => {
        this.currentNotification = message;
        if (message) {
          console.log('New notification:', message);

          setTimeout(() => {
            this.currentNotification = null;
          }, 5000);
        }
      });
    }
}