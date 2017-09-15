import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SupplierService {
    private readonly endpoint = '/api/supplier';
    constructor(private http: Http) { }

    getSuppliers() {
        return this.http.get(this.endpoint)
            .map(res => res.json());
    }
}