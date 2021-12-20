import { ErrorHandler, Injectable } from '@angular/core';
import { CrudException } from '../type/CrudException';

@Injectable()
export class CrudExceptionHandler implements ErrorHandler {
  handleError(error: CrudException): void {
    console.log(error.message);
  }
}
