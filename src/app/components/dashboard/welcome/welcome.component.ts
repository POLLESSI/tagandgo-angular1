import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesDefined } from 'src/app/constants/routes';
import { Routes, RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss'],
    standalone: true,
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
export class WelcomeComponent {
    RoutesDefined = RoutesDefined;
}