import { Injectable } from '@angular/core';
import { BaseRequestOptions, Headers } from '@angular/http';

@Injectable()
export class CustomRequestOptions extends BaseRequestOptions {
    constructor() {
        super();
        this.headers = new Headers({
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0'
        });
    }
   
}