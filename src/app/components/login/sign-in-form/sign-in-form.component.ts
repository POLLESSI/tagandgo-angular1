import { UserAuthModel } from './../../../models/user/userAuth.model';
import { AuthService } from '../../../services/api/auth.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';


import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { RoutesDefined } from 'src/app/constants/routes';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewComponent } from '../../util/dialog-overview/dialog-overview.component';

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss'
})
export class SignInFormComponent {

  readonly dialog = inject(MatDialog);

  mail: string;
  password: string;

  loading: boolean = false;

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
      this.loading = true;
      await this.authService.login(userAuth);
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
