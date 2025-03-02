import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { Roles } from '../constants/roles-constants';
import { RoutesDefined } from '../constants/routes';
import { TokenService } from '../services/util/token.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {}

  canActivate(): boolean {
    const tokenDecoded = this.tokenService.getTokenDecrypted();
    console.log(tokenDecoded);

    if (tokenDecoded) {
      if (tokenDecoded.role === Roles.ADMIN) {
        return true;
      } else {
        console.warn('Accès refusé : Rôle non autorisé');
        this.router.navigate([RoutesDefined.DASHBOARD, RoutesDefined.FORBIDDEN]);
        return false;
      }
    } else {
      console.warn('Token non trouvé, redirection vers login');
      this.router.navigate([RoutesDefined.LOGIN]);
      return false;
    }
  }
}
