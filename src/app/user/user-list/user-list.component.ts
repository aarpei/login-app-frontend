import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GetUserDto } from 'src/app/shared/dtos/user-get.dto';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  public usersList: Observable<GetUserDto[]> = this.userService.findAll();
  constructor(private readonly userService: UserService<GetUserDto>) {}
}
