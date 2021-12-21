import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccessToken } from '../shared/dtos/auth/access-token.model';
import { UserLoginDto } from '../shared/dtos/user/user-login.dto';
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
