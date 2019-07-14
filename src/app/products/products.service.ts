import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HTTP} from '@ionic-native/http/ngx';
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
}
