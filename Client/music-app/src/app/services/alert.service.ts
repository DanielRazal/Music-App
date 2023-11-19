import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  success(title: string, content: string, footer: string): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'success',
      title: title,
      text: content,
      footer: footer
    });
  }

  error(title: string, content: string, footer: string): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'error',
      title: title,
      text: content,
      footer: footer
    });
  }

  delete(): Promise<any> {
    return Swal.fire({
      title: 'Are you sure?',
      html: '<strong>This action cannot be undone.</strong>',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    });
  }
}
