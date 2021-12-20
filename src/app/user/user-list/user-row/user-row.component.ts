import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetUserDto } from 'src/app/shared/dtos/user-get.dto';

@Component({
  selector: 'app-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss'],
})
export class UserRowComponent {
  private _user: GetUserDto = {
    id: '',
    name: '',
    surname: '',
    email: '',
  };

  @Input() set user(user: GetUserDto) {
    this._user = user;
  }

  @Output() userIdEmmiter: EventEmitter<string> = new EventEmitter<string>();

  get user(): any {
    return this._user;
  }

  public showUserDetail(): void {
    this.userIdEmmiter.emit(this.user.id);
  }
}
