import { Component, OnInit } from '@angular/core';

import { Alert, AlertType } from '../../../models/alert.model';
import { AlertService } from '../../../services/alert.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { AlertMessageComponent } from './alert-message.component';

@Component({
    selector: 'app-alert',
    template: ''
})

export class AlertComponent {
    alerts: Alert[] = [];
    snackBarRef: MatSnackBarRef<AlertMessageComponent>;

    constructor(private alertService: AlertService, private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.alertService.getAlert().subscribe((alert: Alert) => {
            if (!alert) {
                this.snackBar.dismiss();
                return;
            }

            const duration = alert.autoClear;

            let config: any = {
                panelClass: this.cssClass(alert),
                horizontalPosition: 'right',
                verticalPosition: 'top',
                duration,
                data: {
                    message: alert.message,
                    duration
                }
            }

            this.snackBarRef = this.snackBar.openFromComponent(AlertMessageComponent, config);
            this.snackBarRef.instance.snackBarRefAlertMessageComponent = this.snackBarRef;
        });
    }

    cssClass(alert: Alert) {
        switch (alert.type) {
            case AlertType.Success:
                return 'alert-success';
            case AlertType.Error:
                return 'alert-error';
            case AlertType.Info:
                return 'alert-info';
            case AlertType.Warning:
                return 'alert-warning';
        }
    }
}