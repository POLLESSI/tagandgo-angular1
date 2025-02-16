import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoutesDefined } from 'src/app/constants/routes';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [ RouterModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  routesDefined: typeof RoutesDefined = RoutesDefined;
}
