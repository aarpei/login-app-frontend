import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs';
import { InputModel } from 'src/app/shared/components/input/model/input.model';
import { UpdateUserDto } from 'src/app/shared/dtos/user/user-update.dto';
import { User } from 'src/app/shared/inteface/user.model';
import { InputService } from 'src/app/shared/services/input.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { encrypt } from 'src/app/shared/Utils';
import { UserService } from '../user.service';

/**
 * Component to show user selected info and updated
 */
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

  public emailInputModel?: InputModel;
  public passwordInputModel?: InputModel;
  public nameInputModel?: InputModel;
  public surnameInputModel?: InputModel;

  constructor(
    private readonly userService: UserService<User>,
    private readonly inputService: InputService,
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

  /**
   * Build form and fill it with user data recovered from db
   */
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

    this.emailInputModel = this.inputService.getEmailInput(
      this.emailInputControl,
    );
    this.passwordInputModel = this.inputService.getPasswordInput(
      this.passwordInputControl,
    );
    this.nameInputModel = this.inputService.getNameInput(this.nameInputControl);
    this.surnameInputModel = this.inputService.getSurnameInput(
      this.surnameInputControl,
    );
  }

  /**
   * Update user data in db with data changed in form
   */
  public updateUser(): void {
    let updatedUser: any = new UpdateUserDto();
    updatedUser = { ...updatedUser, ...this.formGroup.getRawValue() };

    /**
     * Remove data not changed
     */
    Object.keys(updatedUser).forEach((propertie) => {
      if (
        updatedUser[propertie] === this.originalUser[propertie] ||
        updatedUser[propertie] === ''
      ) {
        delete updatedUser[propertie];
      }
    });
    if (updatedUser.password) {
      updatedUser.password = encrypt(updatedUser.password);
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
