import { Injectable } from '@angular/core';
import { TokenDecoded } from '../models/util/token';    
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    constructor() { }
    getTokenStored(): string {
        return localStorage.getItem('token');
    }

    getTokenDescripted(): TokenDecoded {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken: any = jwtDecode(token);

            const KeyRole: string = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
            const KeyUserId: string = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";

            return {
                email: decodedToken.email,
                role: decodedToken[KeyRole],
                userId: decodedToken[KeyUserId]
            };
        }
        return null;
    }
}