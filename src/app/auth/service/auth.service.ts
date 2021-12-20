import { Injectable } from '@angular/core';
import { recoverAccessToken, removeAccessToken } from '../../shared/Utils';

@Injectable()
export class AuthService {
  private _accessToken?: string;

  public set accessToken(accessToken: string | undefined) {
    if (!accessToken) {
      console.log('REMOVED');
      removeAccessToken();
    }
    this._accessToken = accessToken;
  }

  public get accessToken() {
    return this._accessToken;
  }

  constructor() {
    this.accessToken = recoverAccessToken() ?? undefined;
  }

  public userIsLogged(): boolean {
    return this.accessToken !== undefined;
  }
}
