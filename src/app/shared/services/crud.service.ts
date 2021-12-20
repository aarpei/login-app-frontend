import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudServiceAbstract } from '../abstracts/crud.service.abstract';
import { CrudException } from '../error/type/CrudException';
import { decryptPassword, encryptPassword } from '../Utils';

@Injectable({
  providedIn: 'root',
})
export class CrudService<T> implements CrudServiceAbstract<T> {
  private apiUrl: string = environment.url.api.base;
  private apiCrudEndpoint: string = '';

  private errorGeneric: string = 'error.database.generic';
  private errorType: string = '';
  private errorActionCreate: string = 'error.database.action.create';
  private errorActionGet: string = 'error.database.action.get';
  private errorActionDelete: string = 'error.database.action.delete';
  private errorActionUpdate: string = 'error.database.action.update';

  constructor(private readonly httpClient: HttpClient) {}

  public findAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.apiCrudEndpoint).pipe(
      catchError((error) => {
        throw new CrudException(
          error.status,
          this.errorGeneric,
          this.errorActionGet,
          this.errorType,
        );
      }),
    );
  }

  public findByPropertie(propertie: string): Observable<T> {
    return this.httpClient.get<T>(`${this.apiCrudEndpoint}${propertie}`).pipe(
      map((value) => {
        if ((value as any)?.password) {
          (value as any).password = decryptPassword((value as any).password);
        }
        return value;
      }),
      catchError((error) => {
        let splitedPropertie = propertie.split(':');
        throw new CrudException(
          error.status,
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
    if ((newEntry as any)?.password) {
      (newEntry as any).password = encryptPassword((newEntry as any).password);
    }

    return this.httpClient.post<T>(this.apiCrudEndpoint, newEntry).pipe(
      catchError((error) => {
        throw new CrudException(
          error.status,
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
          error.status,
          this.errorGeneric,
          this.errorActionDelete,
          this.errorType,
        );
      }),
    );
  }

  public update(id: number, updatedEntity: any): Observable<T> {
    return this.httpClient
      .put<T>(`${this.apiCrudEndpoint}id:${id}`, updatedEntity)
      .pipe(
        catchError((error) => {
          throw new CrudException(
            error.status,
            this.errorGeneric,
            this.errorActionUpdate,
            this.errorType,
          );
        }),
      );
  }

  public setApiCrudEndpointUrl(
    environmentApiUrl: string,
    crudEndopint: string,
  ): void {
    this.apiCrudEndpoint = `${environmentApiUrl}${this.apiUrl}${crudEndopint}`;
  }

  public setErrorType(errorType: string): void {
    this.errorType = errorType;
  }
}
