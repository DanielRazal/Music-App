import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private alertService: AlertService) { }

  errorsRegister(error: HttpErrorResponse) {
    if (error.status === 401 && error.error && error.error.message) {
      const unauthorizedErrorMessage = error.error.message;

      this.alertService.error('Unauthorized', unauthorizedErrorMessage, `Status code: ${error.status}`);
    } else if (error.status === 400 && error.error && error.error.message && Array.isArray(error.error.message)) {
      const errorMessages = error.error.message;

      let currentIndex = 0;

      const displayNextError = () => {
        if (currentIndex < errorMessages.length) {
          const errorMessage = errorMessages[currentIndex];

          this.alertService.error('Error', errorMessage, `Status code: ${error.status}`);

          currentIndex++;
        }
      };

      // Initial display
      displayNextError();
    }

  }
}
