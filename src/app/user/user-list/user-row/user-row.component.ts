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

  @Output() showEmmiter: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteEmmiter: EventEmitter<string> = new EventEmitter<string>();

  get user(): any {
    return this._user;
  }

  public showUserDetail(): void {
    this.showEmmiter.emit(this.user.id);
  }
  public deleteUser(): void {
    console.log('DELETE');
    this.deleteEmmiter.emit(this.user.id);
  }
}
