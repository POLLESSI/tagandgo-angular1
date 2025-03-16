import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RoutesDefined } from 'src/app/constants/routes';

@Component({
    selector: 'app-forbidden',
    standalone: true,
    // imports: [],
    templateUrl: './forbidden.Component.html',
    styleUrls: ['./forbidden.component.scss'],
    imports: [
        CommonModule,
        MatSlideToggleModule,
        MatButtonModule,
        RouterModule
    ]
})
export class ForbiddenComponent {
    
}