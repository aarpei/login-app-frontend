import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudServiceAbstract } from '../abstracts/crud.service.abstract';
import { CrudException } from '../error/type/CrudException';

export class CrudService<T> implements CrudServiceAbstract<T> {
  private apiUrl: string = environment.url.api.base;
  private apiCrudEndpoint: string = '';

  /**
   * Literales de las traducciones
   *  */
  private errorType: string = '';
  private errorGeneric: string = 'error.database.generic';
  private errorActionCreate: string = 'error.database.action.create';
  private errorActionGet: string = 'error.database.action.get';
  private errorActionDelete: string = 'error.database.action.delete';
  private errorActionUpdate: string = 'error.database.action.update';

  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Devuelve todas las entidades del tipo T
   *  */
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

  /**
   *  Devuelve una entidad de tipo T en función de la propiedad + valor (sepadarados por ':')
   *  pasados en la URL.
   * */
  public findByPropertie(propertie: string): Observable<T> {
    return this.httpClient.get<T>(`${this.apiCrudEndpoint}${propertie}`).pipe(
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

  /**
   * Crea una nueva instancia de la entidad de tipo T y la almacena en la base de datos
   */
  public create(newEntry: any): Observable<T> {
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

  /**
   * Elimina una entidad de tipo T en base al id enviado en la URL
   */
  public delete(id: number): Observable<T> {
    return this.httpClient.delete<T>(`${this.apiCrudEndpoint}${id}`).pipe(
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

  /**
   * Actualiza una entidad de tipo T
   */
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

  /**
   * Compone el valor completo de la URL de la api a la
   * que debe atacar el servicio
   */
  public setApiCrudEndpointUrl(
    environmentApiUrl: string,
    crudEndopint: string,
  ): void {
    this.apiCrudEndpoint = `${environmentApiUrl}${this.apiUrl}${crudEndopint}`;
  }

  /**
   * Literal de la traducción del tipo de la entidad
   */
  public setErrorType(errorType: string): void {
    this.errorType = errorType;
  }
}
