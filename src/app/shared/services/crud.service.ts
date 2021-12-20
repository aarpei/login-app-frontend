import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudServiceAbstract } from '../abstracts/crud.service.abstract';
import { CrudException } from '../error/type/CrudException';

@Injectable({
  providedIn: 'root',
})
export class CrudService<T> implements CrudServiceAbstract<T> {
  private apiUrl: string = environment.url.api.base;
  private apiCrudEndpoint: string = '';

  private errorGeneric: string = 'error.database.generic';
  private errorType: string = 'error.database.type.user';

  private errorActionCreate: string = 'error.action.create';
  private errorActionGet: string = 'error.action.get';
  private errorActionDelete: string = 'error.action.delete';
  private errorActionUpdate: string = 'error.action.update';

  constructor(private readonly httpClient: HttpClient) {}

  public findAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.apiCrudEndpoint).pipe(
      catchError((error) => {
        throw new CrudException(
          this.errorGeneric,
          this.errorActionGet,
          this.errorType,
        );
      }),
    );
  }

  public findByPropertie(propertie: string): Observable<T> {
    return this.httpClient.get<T>(`${this.apiCrudEndpoint}/${propertie}`).pipe(
      catchError((error) => {
        let splitedPropertie = propertie.split(':');
        throw new CrudException(
          this.errorGeneric,
          this.errorActionGet,
          this.errorType,
          splitedPropertie[0],
          splitedPropertie[1],
        );
      }),
    );
  }

  public create(newEntry: any): Observable<T> {
    return this.httpClient.post<T>(this.apiCrudEndpoint, newEntry).pipe(
      catchError((error) => {
        throw new CrudException(
          this.errorGeneric,
          this.errorActionCreate,
          this.errorType,
        );
      }),
    );
  }

  public delete(id: number): Observable<T> {
    return this.httpClient.delete<T>(`${this.apiCrudEndpoint}/${id}`).pipe(
      catchError((error) => {
        throw new CrudException(
          this.errorGeneric,
          this.errorActionDelete,
          this.errorType,
        );
      }),
    );
  }

  public update(id: number, updatedEntity: any): Observable<T> {
    return this.httpClient
      .post<T>(`${this.apiCrudEndpoint}/${id}`, updatedEntity)
      .pipe(
        catchError((error) => {
          throw new CrudException(
            this.errorGeneric,
            this.errorActionUpdate,
            this.errorType,
          );
        }),
      );
  }

  public setApiCrudEndpoint(
    environmentApiUrl: string,
    crudEndopint: string,
  ): void {
    this.apiCrudEndpoint = `${environmentApiUrl}${this.apiUrl}${crudEndopint}`;
  }
}
