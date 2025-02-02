import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { RoutesDefined } from 'src/app/constants/routes';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [ MatToolbarModule, MatButtonModule, MatIconModule, RouterModule ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

  routesDefined: typeof RoutesDefined = RoutesDefined;

}
