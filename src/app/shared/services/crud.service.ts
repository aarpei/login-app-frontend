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

  constructor(private readonly httpClient: HttpClient) {}

  public findAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.apiCrudEndpoint).pipe(
      catchError((error) => {
        throw new CrudException(error.message);
      })
    );
  }

  public findByPropertie(propertie: string): Observable<T> {
    return this.httpClient.get<T>(`${this.apiCrudEndpoint}/${propertie}`).pipe(
      catchError((error) => {
        throw new CrudException(error.message);
      })
    );
  }

  public create(newEntry: any): Observable<T> {
    return this.httpClient.post<T>(this.apiCrudEndpoint, newEntry).pipe(
      catchError((error) => {
        throw new CrudException(error.message);
      })
    );
  }

  public delete(id: number): Observable<T> {
    return this.httpClient.delete<T>(`${this.apiCrudEndpoint}/${id}`).pipe(
      catchError((error) => {
        throw new CrudException(error.message);
      })
    );
  }

  public update(id: number, updatedEntity: any): Observable<T> {
    return this.httpClient
      .post<T>(`${this.apiCrudEndpoint}/${id}`, updatedEntity)
      .pipe(
        catchError((error) => {
          throw new CrudException(error.message);
        })
      );
  }

  public setApiCrudEndpoint(
    environmentApiUrl: string,
    crudEndopint: string
  ): void {
    this.apiCrudEndpoint = `${environmentApiUrl}${this.apiUrl}${crudEndopint}`;
  }
}
