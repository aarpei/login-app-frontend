import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CrudService } from '../shared/services/crud.service';

@Injectable({
  providedIn: 'root',
})
export class UserService<User> extends CrudService<User> {
  private enviromentApi: string = environment.environment_api.local;
  private usersEndpoint: string = environment.url.api.users;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setApiCrudEndpoint(this.enviromentApi, this.usersEndpoint);
  }
}
