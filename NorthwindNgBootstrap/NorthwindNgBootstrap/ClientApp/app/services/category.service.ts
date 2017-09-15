import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CategoryService {
    private readonly endpoint = '/api/category';
    constructor(private http: Http) { }

    getCategories() {
        return this.http.get(this.endpoint)
            .map(res => res.json());
    }
}