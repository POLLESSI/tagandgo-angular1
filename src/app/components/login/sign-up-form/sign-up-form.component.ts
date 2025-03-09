import { CommonModule } from '@angular/common';
import { UserService } from './../../../services/api/user.service';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserCreationModel } from 'src/app/models/user/userCreation.model';
import { MatError } from '@angular/material/form-field';
import { AuthService } from 'src/app/services/api/auth.service';
import { Router } from '@angular/router';
import { RoutesDefined } from 'src/app/constants/routes';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewComponent } from '../../util/dialog-overview/dialog-overview.component';


@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatError,
    MatProgressSpinnerModule
  ],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent {

  readonly dialog = inject(MatDialog);

  @ViewChild('loginForm') loginForm!: ElementRef<HTMLDivElement>;

  mail: string;
  password: string;
  confirmPassword: string;

  loading: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

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
      this.loading = true;
      await this.userService.createUser(user);
      await this.authService.login(user);
      this.loading = false;

      this.router.navigate([RoutesDefined.DASHBOARD, RoutesDefined.WELCOME]);

    } catch (error) {
      this.loading = false;
      this.openDialog();
      console.error(`Erreur de connexion utilisateur : ${error.message}`);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      data: {title: "Attention", text: "La connexion a échoué, réessayez plus tard."},
    });
  }
}
