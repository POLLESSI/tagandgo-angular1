import { NUserAuthModel } from "src/app/models/nuser/nuser.Auth.model"; 
import { AuthService } from "src/app/services/auth.service";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";

import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { RoutesDefined } from "src/app/constants/routes";

@Component({
    selector: 'app-login',
    standalone: true, 
    imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    mail: string;
    password: string;

    constructor(private authService: AuthService, private router: Router) {}

    public async submit(activityForm: NgForm): Promise<void> {
        // Validation via le formulaire
        if (activityForm.invalid) {
            console.log("Form is invalid");
            return;
        }

        const nuserAuth: NUserAuthModel = {
            email: this.mail,
            password: this.password
        }

        try {
            await this.authService.login(nuserAuth);

            this.router.navigate([RoutesDefined.DASHBOARD, RoutesDefined.WELCOME]);
        } catch (error) {
            console.error(`User login error : ${error.message}`)
        }
    }
}