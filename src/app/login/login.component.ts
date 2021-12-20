import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputModel } from '../shared/components/input/model/input.model';
import { UserLoginDto } from '../shared/dtos/user-login.dto';
import { InputType } from '../shared/enums/input-type.enum';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public formGroup = new FormGroup({});
  public emailInputControl = new FormControl('', Validators.required);
  public passwordInputControl = new FormControl('', Validators.required);

  public emailInputModel: InputModel = {
    type: InputType.EMAIL,
    label: 'input.label.email',
    placeholder: 'input.placeholder.email',
    formControl: this.emailInputControl,
  };

  public passwordInputModel: InputModel = {
    type: InputType.PASSWORD,
    label: 'input.label.password',
    placeholder: 'input.placeholder.password',
    formControl: this.passwordInputControl,
  };

  constructor(private readonly loginService: LoginService) {
    this.formGroup = new FormGroup({
      email: this.emailInputControl,
      password: this.passwordInputControl,
    });
  }

  public login(): void {
    const loginUser: UserLoginDto = { ...this.formGroup.getRawValue() };
    this.loginService.login(loginUser).subscribe((token) => {
      console.log(token);
    });
  }
}
