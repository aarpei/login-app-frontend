import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss'],
})
export class UserRowComponent {
  private _user: any = {
    id: 0,
    title: '',
  };

  @Input() set user(user: any) {
    this._user = user;
  }
  get user(): any {
    return this._user;
  }

  /* constructor(private readonly userService: TaskService) {} */
}
