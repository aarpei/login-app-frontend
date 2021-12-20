import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLoginDto } from '../shared/dtos/user-login.dto';
import { AccessToken } from '../shared/inteface/access-token.model';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiEndpointUrl: string = `${environment.environment_api.local}${environment.url.api.base}${environment.url.api.login}`;

  constructor(private readonly httpClient: HttpClient) {}

  public login(loginUser: UserLoginDto): Observable<AccessToken> {
    return this.httpClient
      .post<AccessToken>(this.apiEndpointUrl, loginUser)
      .pipe();
  }
}
