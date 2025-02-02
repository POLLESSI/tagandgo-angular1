import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { CONST_ROLES } from '../constants/roles-constants';
import { RoutesDefined } from '../constants/routes';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Récupère le token depuis le localStorage
    const token = localStorage.getItem('token');

    if (token) {
      try {
        // Décoder le token
        const decodedToken: any = jwtDecode(token);

        console.log(decodedToken);


        const keyRole: string = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

        // Vérifie si l'utilisateur a le rôle Admin
        if (decodedToken[keyRole] && decodedToken[keyRole] === CONST_ROLES.ADMIN) {
          return true; // L'utilisateur a le rôle Admin, accès autorisé
        } else {
          console.warn('Accès refusé : Rôle non autorisé');
          this.router.navigate([RoutesDefined.FORBIDDEN]); // Redirige vers une page "interdite"
          return false;
        }
      } catch (err) {
        console.error('Erreur lors du décodage du token', err);
        this.router.navigate([RoutesDefined.LOGIN]);
        return false;
      }
    } else {
      console.warn('Token non trouvé, redirection vers login');
      this.router.navigate([RoutesDefined.LOGIN]);
      return false;
    }
  }
}
