export class Alert {
    type: AlertType;
    message: string;
    autoClear: 0;
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}