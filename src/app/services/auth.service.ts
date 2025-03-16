import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { CONST_API } from '../constants/api-constants';
import { NUserAuthModel } from '../models/nuser/nuser.Auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) {}

    public async login(nUserAuthModel: NUserAuthModel): Promise<boolean> {
        const url: string = `${CONST_API.URL_API}/Auth/login`;
        
        try {
            // Effectuer la requête à l'API
            const response: any = await firstValueFrom(
                this.http.post(url, nUserAuthModel, { responseType: 'json' })
            );

            // Stocker le token dans le local storage
            if (response && response.token) {
                localStorage.setItem('token', response.token); // Stocke le token avec une clé "token"
                return true;
            }

            // Si la reponse ne contient pas de token
            console.error('Token not found in response of API');
            return false;
        } catch (error: any) {
            throw new Error('Token not found in response of API'); 
        }
    } 
    
    public verifyToken(): Observable<boolean> {
        const url: string = `${CONST_API.URL_API}/Auth/verifyToken`;

        // Vérifier le token via l'API
        return this.http.get<boolean>(url, { });
    }
}