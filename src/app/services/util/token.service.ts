import { Injectable } from '@angular/core';
import { TokenDecoded } from '../../models/util/token';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getTokenStored(): string {
    return localStorage.getItem('token');
  }

  getTokenDecrypted(): TokenDecoded {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken: any = jwtDecode(token);

      const keyRole: string = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
      const keyUserId: string = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";

      return {
        email: decodedToken.email,
        role: decodedToken[keyRole],
        userId: decodedToken[keyUserId]
      };
    }

    return null;
  }
}
