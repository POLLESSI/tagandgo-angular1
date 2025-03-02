import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CONST_API } from 'src/app/constants/api-constants';
import { UserModel } from 'src/app/models/user/user.model';
import { UserCreationModel } from 'src/app/models/user/userCreation.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public async createUser(userCreated: UserCreationModel): Promise<UserModel> {
    const url: string = `${CONST_API.URL_API}/User`;

    try {
      const respons: any = await firstValueFrom(this.http.post(url, userCreated));

      return respons as UserModel

    } catch (error) {
      throw error;
    }
  }
}
