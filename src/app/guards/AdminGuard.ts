import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Roles } from '../constants/roles-constants';
import { RoutesDefined } from '../constants/routes';
import { jwtDecode } from 'jwt-decode';
import { TokenService } from '../services/token.service';
import { TokenDecoded } from '../models/util/token';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private TokenService: TokenService
  ) {}

  canActivate(): boolean {
    // Récupération du token dans le localStorage

    const tokenDecoded = this.TokenService.getTokenDescripted();

    if (tokenDecoded) {
      if (tokenDecoded.role === Roles.ADMIN) {  
        return true;
      } else {
        console.warn('Access Denied: Role not authorized');
        this.router.navigate([RoutesDefined.DASHBOARD, RoutesDefined.FORBIDDEN]);
        return false;
      }
    } else {
        console.warn('Access Denied: Token not found, redirect to login');
        this.router.navigate([RoutesDefined.LOGIN]);
        return false;
    }
  }
}