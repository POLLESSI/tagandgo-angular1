import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { CONST_API } from '../constants/api-constants';
import { UserAuthModel } from '../models/user/userAuth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public async login(userAuth: UserAuthModel): Promise<boolean> {
    const url: string = `${CONST_API.URL_API}/Auth/login`;

    try {
      // Effectuer la requête à l'API
      const response: any = await firstValueFrom(
        this.http.post(url, userAuth, { responseType: 'json' })
      );

      // Stocker le token dans le localStorage
      if (response && response.token) {
        localStorage.setItem('token', response.token); // Stocke le token avec une clé "token"
        return true;
      }

      // Si la réponse ne contient pas de token
      console.error('Token manquant dans la réponse de l\'API');
      return false;

    } catch (error: any) {
      throw new Error('Token manquant dans la réponse de l\'API');
    }
  }

  public verifyToken(): Observable<boolean> {
    const url: string = `${CONST_API.URL_API}/Auth/verifyToken`;

    // Vérifier le token via l'API
    return this.http.post<boolean>(url, { });
  }
}
