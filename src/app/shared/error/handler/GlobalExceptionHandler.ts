import { ErrorHandler, Injectable } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { CrudException } from '../type/CrudException';

@Injectable()
export class GlobalExceptionHandler implements ErrorHandler {
  constructor(private readonly notificationService: NotificationsService) {}

  handleError(error: any): void {
    switch (typeof error) {
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
