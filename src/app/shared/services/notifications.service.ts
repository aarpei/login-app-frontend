import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(
    private snackBar: MatSnackBar,
    private readonly translateService: TranslateService
  ) {}

  private showNotification(message: string): void {
    this.snackBar.open(message, '', {
      duration: 1500,
    });
  }

  public showUserSuccessNotification(action: string): void {
    const translation = this.translateService.instant(
      'success.database.generic.user',
      {
        action: action,
      }
    );
    this.showNotification(translation);
  }
}
