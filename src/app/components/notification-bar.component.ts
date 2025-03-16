import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../services/notification.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RoutesDefined } from 'src/app/constants/routes';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-notification-bar',
    standalone: true,
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
    `],
    imports: [
      CommonModule,
      MatSlideToggleModule,
      MatButtonModule,
      RouterModule,
      FormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatTableModule,
      MatButtonModule
  ]
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