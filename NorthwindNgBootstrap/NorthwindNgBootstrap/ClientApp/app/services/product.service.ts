import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Product } from './../models/product';

@Injectable()
export class ProductService {
    private readonly endpoint = '/api/product';
    constructor(private http: Http) { }

    getProduct(id: number) {
        return this.http.get(this.endpoint + '/' + id)
            .map(res => res.json());
    }

    getProducts(filter: any) {
        return this.http.get(this.endpoint + '?' + this.toQueryString(filter))
            .map(res => res.json());
    }

    create(product: Product)
    {
        return this.http.post(this.endpoint, product)
            .map(res => res.json());
    }

    update(product: Product) {
        return this.http.put(this.endpoint + '/' + product.productId, product)
            .map(res => res.json());
    }

    delete(product: Product) {
        return this.http.delete(this.endpoint + '/' + product.productId);
    }

    toQueryString(obj: any) {
        var parts = [];
        for (var property in obj) {
            var value = obj[property];
            if (value != null && value != undefined)
                parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
        }

        return parts.join('&');
    }
}