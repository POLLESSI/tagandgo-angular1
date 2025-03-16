import { NavigationComponent } from './navigation/navigation.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RoutesDefined } from 'src/app/constants/routes';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [
        CommonModule,
        NavigationComponent,
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
export class DashboardComponent {
    routesDefined = RoutesDefined.getRoutes();
}