import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { RoutesDefined } from '../constants/routes';

@Injectable({
    providedIn: 'root',
})
export class AuthGard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.authService.verifyToken().pipe(
            map((isValid) => {
                if (!isValid) {
                    this.router.navigate([RoutesDefined.LOGIN]); // Redirection si token invalide
                    return false;
                }
                return true;
            }),
            catchError((error) => {
                console.error('Error verifying token', error); 
                this.router.navigate([RoutesDefined.LOGIN]); // Redirection en cas d'erreur
                return [false];
            })      
        );
    }
}