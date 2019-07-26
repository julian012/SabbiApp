import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductModel} from '../models/Product.model';
import {HTTP_URL} from '../models/httpStatus';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient) {
    }

    public getDataProduct(): Observable<ProductModel[]> {
        return this.http.get<ProductModel[]>(HTTP_URL + '/product');
    }

    public getProductImage(productId) {
        console.log(productId);
        return this.http.post(HTTP_URL + '/photo', {product_id: productId});
    }
}
