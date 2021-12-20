import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/inteface/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
  public user?: Observable<User>;

  @Input() public set userId(userId: string) {
    this.user = this.userService.findByPropertie(`id:${userId}`);
  }

  constructor(private readonly userService: UserService<User>) {}
}
