import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs';
import { InputModel } from 'src/app/shared/components/input/model/input.model';
import { UpdateUserDto } from 'src/app/shared/dtos/user/user-update.dto';
import { InputType } from 'src/app/shared/enums/input-type.enum';
import { User } from 'src/app/shared/inteface/user.model';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { encryptPassword } from 'src/app/shared/Utils';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
  private userId = 0;
  private originalUser?: any;

  public user?: User;
  public formGroup = new FormGroup({});

  public emailInputControl?: FormControl;
  public passwordInputControl?: FormControl;
  public nameInputControl?: FormControl;
  public surnameInputControl?: FormControl;

  public emailInputModel: InputModel = {
    type: '',
    label: '',
    placeholder: '',
    formControl: new FormControl(),
  };
  public passwordInputModel: InputModel = {
    type: '',
    label: '',
    placeholder: '',
    formControl: new FormControl(),
  };
  public nameInputModel: InputModel = {
    type: '',
    label: '',
    placeholder: '',
    formControl: new FormControl(),
  };
  public surnameInputModel: InputModel = {
    type: '',
    label: '',
    placeholder: '',
    formControl: new FormControl(),
  };

  constructor(
    private readonly userService: UserService<User>,
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    private readonly notificationService: NotificationsService,
  ) {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.userService
        .findByPropertie(`id:${this.userId}`)
        .pipe(
          catchError((error) => {
            this.location.back();
            throw new Error();
          }),
        )
        .subscribe((user) => {
          this.user = user;
          this.originalUser = user;
          this.buildForm();
        });
    });
  }

  private buildForm() {
    this.emailInputControl = new FormControl(this.user?.email, [
      Validators.email,
    ]);
    this.passwordInputControl = new FormControl('', []);
    this.nameInputControl = new FormControl(this.user?.name, []);
    this.surnameInputControl = new FormControl(this.user?.surname, []);

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

  public updateUser(): void {
    let updatedUser: any = new UpdateUserDto();
    updatedUser = { ...updatedUser, ...this.formGroup.getRawValue() };

    Object.keys(updatedUser).forEach((propertie) => {
      if (updatedUser[propertie] === this.originalUser[propertie]) {
        delete updatedUser[propertie];
      }
    });

    if (!updatedUser.password) {
      delete updatedUser.password;
    } else {
      updatedUser.password = encryptPassword(updatedUser.password);
    }

    this.userService
      .update(this.userId, updatedUser)
      .subscribe((response) =>
        this.notificationService.showCompossedSuccessNotification(
          'success.database.generic.user',
          { action: 'success.database.action.update' },
        ),
      );
  }
}
