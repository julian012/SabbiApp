import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductModel} from '../models/Product.model';
import {HTTP_URL} from '../models/httpStatus';
import {PhotoModel} from '../models/Photo.model';
import {ProductPriceModel} from '../models/ProductPrice.model';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient) {
    }

    public getDataProduct(): Observable<ProductModel[]> {
        return this.http.get<ProductModel[]>(HTTP_URL + '/product');
    }

    public getProductImage(): Observable<PhotoModel[]> {
        return this.http.get<PhotoModel[]>(HTTP_URL + '/photo');
    }

    public getProductPrice(): Observable<ProductPriceModel[]> {
        return this.http.get<ProductPriceModel[]>(HTTP_URL + '/product_price');
    }
}
