import { CommonModule } from '@angular/common';
import { UserService } from './../../../services/api/user.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserCreationModel } from 'src/app/models/user/userCreation.model';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatError
  ],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent {

  @ViewChild('loginForm') loginForm!: ElementRef<HTMLDivElement>;

  mail: string;
  password: string;
  confirmPassword: string;

  constructor(private userService: UserService) {}

  // Vérifie si les mots de passe correspondent
  get passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }

  public async submit(form: NgForm): Promise<void> {
    // Validation via le formulaire
    if (form.invalid) {
      console.log("Form is invalid");
      return;
    }

    const user: UserCreationModel = {
      email: this.mail,
      password: this.password
    }

    try {
      await this.userService.createUser(user);

      //this.router.navigate([RoutesDefined.DASHBOARD, RoutesDefined.WELCOME]);

    } catch (error) {
      console.error(`Erreur de connexion utilisateur : ${error.message}`);
    }
  }
}
