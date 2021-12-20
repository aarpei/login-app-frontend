import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
enum snackBarClasses {
  ERROR_CLASS = 'error-snackbar',
  WARNING_CLASS = 'warning-snackbar',
  SUCCESS_CLASS = 'success-snackbar',
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(
    private snackBar: MatSnackBar,
    private readonly translateService: TranslateService,
  ) {}

  private showNotification(message: string, snackBarClass: string): void {
    this.snackBar.open(message, '', {
      duration: 1500,
      panelClass: [snackBarClass],
    });
  }

  public showCompossedSuccessNotification(
    template: string,
    variables?: any,
  ): void {
    variables = variables ? this.translateVariables(variables) : null;
    const translation = this.translateService.instant(template, variables);
    this.showNotification(translation, snackBarClasses.SUCCESS_CLASS);
  }
  public showCompossedErrorNotification(
    template: string,
    variables?: any,
  ): void {
    variables = variables ? this.translateVariables(variables) : null;
    const translation = this.translateService.instant(template, variables);
    this.showNotification(translation, snackBarClasses.ERROR_CLASS);
  }

  private translateVariables(variables: any): any {
    Object.keys(variables).forEach(
      (propertie) =>
        (variables[propertie] = this.translateService.instant(
          variables[propertie],
        )),
    );
    return variables;
  }
}
