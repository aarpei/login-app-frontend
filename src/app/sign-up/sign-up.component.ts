import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputModel } from '../shared/components/input/model/input.model';
import { CreateUserDto } from '../shared/dtos/user/user-create.dto';
import { InputType } from '../shared/enums/input-type.enum';
import { User } from '../shared/inteface/user.model';
import { NotificationsService } from '../shared/services/notifications.service';
import { resetFrom } from '../shared/Utils';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  public formGroup = new FormGroup({});
  public emailInputControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  public passwordInputControl = new FormControl('', [Validators.required]);
  public nameInputControl = new FormControl('', [Validators.required]);
  public surnameInputControl = new FormControl('', [Validators.required]);

  public emailInputModel: InputModel;
  public passwordInputModel: InputModel;
  public nameInputModel: InputModel;
  public surnameInputModel: InputModel;

  constructor(
    private readonly userService: UserService<User>,
    private readonly notificationService: NotificationsService,
  ) {
    this.formGroup = new FormGroup({
      email: this.emailInputControl,
      password: this.passwordInputControl,
      name: this.nameInputControl,
      surname: this.surnameInputControl,
    });
    this.emailInputModel = {
      type: InputType.EMAIL,
      label: 'input.label.email',
      placeholder: 'input.placeholder.email',
      formControl: this.emailInputControl,
    };

    this.passwordInputModel = {
      type: InputType.PASSWORD,
      label: 'input.label.password',
      placeholder: 'input.placeholder.password',
      formControl: this.passwordInputControl,
    };
    this.nameInputModel = {
      type: InputType.TEXT,
      label: 'input.label.name',
      placeholder: 'input.placeholder.name',
      formControl: this.nameInputControl,
    };
    this.surnameInputModel = {
      type: InputType.TEXT,
      label: 'input.label.surname',
      placeholder: 'input.placeholder.surname',
      formControl: this.surnameInputControl,
    };
  }
  public signUp(): void {
    let newUser: CreateUserDto = new CreateUserDto();
    newUser = { ...newUser, ...this.formGroup.getRawValue() };
    this.userService.create(newUser).subscribe((data) => {
      resetFrom(this.formGroup);
      this.notificationService.showCompossedSuccessNotification(
        'success.database.generic.user',
        {
          action: 'success.database.action.created',
        },
      );
    });
  }
}
