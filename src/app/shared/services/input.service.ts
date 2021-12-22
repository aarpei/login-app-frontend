import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputModel } from '../components/input/model/input.model';
import { InputType } from '../enums/input-type.enum';

@Injectable({
  providedIn: 'root',
})
/**
 * Notify user actions completed or failed with snackbars
 */
export class InputService {
  public getNameInput(formControl: FormControl): InputModel {
    return {
      type: InputType.TEXT,
      label: 'input.label.name',
      placeholder: 'input.placeholder.name',
      formControl: formControl,
    };
  }
  public getSurnameInput(formControl: FormControl): InputModel {
    return {
      type: InputType.TEXT,
      label: 'input.label.surname',
      placeholder: 'input.placeholder.surname',
      formControl: formControl,
    };
  }
  public getPasswordInput(formControl: FormControl): InputModel {
    return {
      type: InputType.PASSWORD,
      label: 'input.label.password',
      placeholder: 'input.placeholder.password',
      formControl: formControl,
    };
  }
  public getEmailInput(formControl: FormControl): InputModel {
    return {
      type: InputType.EMAIL,
      label: 'input.label.email',
      placeholder: 'input.placeholder.email',
      formControl: formControl,
    };
  }
}
