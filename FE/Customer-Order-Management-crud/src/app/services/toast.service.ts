import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) {}

  success(message: string, title: string = 'Success') {
    this.toastr.success(message, title, {
      positionClass: 'toast-top-right',
      timeOut: 3000,
      progressBar: false,
    });
  }

  error(message: string, title: string = 'Error') {
    this.toastr.error(message, title, {
      positionClass: 'toast-top-right',
      timeOut: 3000,
      progressBar: false,
    });
  }

  info(message: string, title: string = 'Info') {
    this.toastr.info(message, title, {
      positionClass: 'toast-top-right',
      timeOut: 3000,
      progressBar: false,
    });
  }

  warning(message: string, title: string = 'Warning', p0?: { timeOut: number; closeButton: boolean; tapToDismiss: boolean; }) {
    this.toastr.warning(message, title, {
      positionClass: 'toast-top-right',
      timeOut: 3000,
      progressBar: false,
    });
  }
}
