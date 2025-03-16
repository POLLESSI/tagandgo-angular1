import { TokenService } from 'src/app/services/token.service';    
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { RoutesDefined } from 'src/app/constants/routes';
import { Roles } from 'src/app/constants/roles-constants';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
    selector: 'app-navigation',
    standalone: true,
    imports: [ 
        MatToolbarModule, 
        MatButtonModule, 
        MatIconModule, 
        RouterModule, 
        CommonModule 
    ],
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    providers: [
        MatSlideToggleModule, 
        MatButtonModule,
        RouterModule
      ]
})
export class NavigationComponent implements OnInit {
    routesDefined: typeof RoutesDefined = RoutesDefined;

    userRole: Roles;
    showRole: boolean;

    constructor(private tokenService: TokenService) { }

    ngOnInit(): void {
        this.userRole = this.tokenService.getTokenDescripted().role;

        this.showRole = this.userRole === Roles.ADMIN || this.userRole === Roles.MODERATOR;
    }
}