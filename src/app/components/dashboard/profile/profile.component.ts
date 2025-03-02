import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { RoutesDefined } from 'src/app/constants/routes';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ MatButtonModule ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(private router: Router) {}

  desconnection(): void {
    localStorage.removeItem('token');
    this.router.navigate([RoutesDefined.LOGIN]);
  }

}
