import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/service/auth.service';
import { InputModel } from '../shared/components/input/model/input.model';
import { UserLoginDto } from '../shared/dtos/user-login.dto';
import { InputType } from '../shared/enums/input-type.enum';
import { NotificationsService } from '../shared/services/notifications.service';
import { resetFrom, saveAccessToken } from '../shared/Utils';
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

  constructor(
    private readonly loginService: LoginService,
    private readonly notificationService: NotificationsService,
    private readonly authService: AuthService,
    private router: Router,
  ) {
    this.formGroup = new FormGroup({
      email: this.emailInputControl,
      password: this.passwordInputControl,
    });
  }

  public login(): void {
    const loginUser: UserLoginDto = { ...this.formGroup.getRawValue() };
    this.loginService.login(loginUser).subscribe(
      (token) => {
        let { accessToken } = token;
        resetFrom(this.formGroup);
        saveAccessToken(accessToken);
        this.authService.accessToken = accessToken;
        this.router.navigate([environment.url.components.users]);
      },
      (error) => {
        this.notificationService.showCompossedErrorNotification(
          'error.login.generic',
        );
      },
    );
  }
}
