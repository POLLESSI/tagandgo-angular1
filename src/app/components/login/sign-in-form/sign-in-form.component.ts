import { UserAuthModel } from './../../../models/user/userAuth.model';
import { AuthService } from '../../../services/api/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';


import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { RoutesDefined } from 'src/app/constants/routes';

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss'
})
export class SignInFormComponent {

  mail: string;
  password: string;

  constructor(private authService: AuthService,  private router: Router) {}

  public async submit(activityForm: NgForm): Promise<void> {
    // Validation via le formulaire
    if (activityForm.invalid) {
      console.log("Form is invalid");
      return;
    }

    const userAuth: UserAuthModel = {
      email: this.mail,
      password: this.password
    }

    try {
      await this.authService.login(userAuth);

      this.router.navigate([RoutesDefined.DASHBOARD, RoutesDefined.WELCOME]);

    } catch (error) {
      console.error(`Erreur de connexion utilisateur : ${error.message}`);
    }
  }
}
