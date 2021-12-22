import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputModel } from '../components/input/model/input.model';
import { InputType } from '../enums/input-type.enum';

@Injectable({
  providedIn: 'root',
})
/**
 * Service to get InputModels
 * @see {@link input.model}
 * @class
 */
export class InputService {
  /**
   * @return {InputModel} name input model
   */
  public getNameInput(formControl: FormControl): InputModel {
    return {
      type: InputType.TEXT,
      label: 'input.label.name',
      placeholder: 'input.placeholder.name',
      formControl: formControl,
    };
  }

  /**
   * @return {InputModel} surname input model
   */
  public getSurnameInput(formControl: FormControl): InputModel {
    return {
      type: InputType.TEXT,
      label: 'input.label.surname',
      placeholder: 'input.placeholder.surname',
      formControl: formControl,
    };
  }

  /**
   * @return {InputModel} password input model
   */
  public getPasswordInput(formControl: FormControl): InputModel {
    return {
      type: InputType.PASSWORD,
      label: 'input.label.password',
      placeholder: 'input.placeholder.password',
      formControl: formControl,
    };
  }

  /**
   * @return {InputModel} email input model
   */
  public getEmailInput(formControl: FormControl): InputModel {
    return {
      type: InputType.EMAIL,
      label: 'input.label.email',
      placeholder: 'input.placeholder.email',
      formControl: formControl,
    };
  }
}
