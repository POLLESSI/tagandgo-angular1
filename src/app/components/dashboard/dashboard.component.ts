import { NavigationComponent } from './navigation/navigation.component';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RoutesDefined } from 'src/app/constants/routes';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ MatButtonModule, RouterModule, NavigationComponent ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  routesDefined: typeof RoutesDefined = RoutesDefined ;

}
