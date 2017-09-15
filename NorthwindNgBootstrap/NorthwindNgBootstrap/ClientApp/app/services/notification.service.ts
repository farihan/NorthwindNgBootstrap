import { Injectable } from '@angular/core';
import { ToastyService } from "ng2-toasty";

@Injectable()
export class NotificationService {

    constructor(private toastyService: ToastyService) { }

    success(message: string) {
        this.toastyService.success({
            title: 'Success',
            msg: message,
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
        });
    }

    error(message: string) {
        this.toastyService.error({
            title: 'Error',
            msg: 'Oops! Something went wrong. ' + message,
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
        });
    }

    info(message: string) {
        this.toastyService.info({
            title: 'Info',
            msg: message,
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
        });
    }

    warning(message: string) {
        this.toastyService.warning({
            title: 'Warning',
            msg: message,
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
        });
    }

    clear() {
        this.toastyService.clearAll();
    }
}