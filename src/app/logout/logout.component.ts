import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.authService.accessToken = undefined;
  }

  public returnToLogin(): void {
    this.router.navigate([environment.url.components.login]);
  }
}
