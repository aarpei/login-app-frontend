import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/service/auth.service';

/**
 * Navbar component used to show menu
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly translateService: TranslateService,
  ) {}

  public isLoggedUser(): boolean {
    return this.authService.userIsLogged();
  }

  public setLanguage(language: string): void {
    this.translateService.setDefaultLang(language);
  }
}
