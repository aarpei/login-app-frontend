import { HttpStatusCode } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NotificationsService } from '../../services/notifications.service';
import { CrudException } from '../type/CrudException';

@Injectable()
export class GlobalExceptionHandler implements ErrorHandler {
  constructor(
    private readonly notificationService: NotificationsService,
    private readonly router: Router,
    private readonly zone: NgZone,
  ) {}

  handleError(error: any): void {
    if (error?.status === HttpStatusCode.Unauthorized) {
      this.zone.run(() =>
        this.router.navigate([environment.url.components.logout]),
      );
    }
    switch (error.constructor.name) {
      case CrudException.name:
        error.type
          ? this.notificationService.showCompossedErrorNotification(
              error.message,
              {
                action: error.action,
                type: error.type,
              },
            )
          : this.notificationService.showCompossedErrorNotification(
              error.message,
              {
                action: error.action,
              },
            );
        break;
      default:
        break;
    }
  }
}
