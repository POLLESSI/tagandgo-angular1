import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RoutesDefined } from 'src/app/constants/routes';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-profile',
    standalone: true,
    // imports: [],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
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
export class ProfileComponent {
    
}