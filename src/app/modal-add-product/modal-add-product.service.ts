import { Injectable } from '@angular/core';
import {HTTP_URL} from '../models/httpStatus';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductModel} from '../models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ModalAddProductService {

  constructor(private http: HttpClient) { }

  public createProduct(product: ProductModel): Observable<ProductModel> {
    console.log(product);
    return this.http.post<ProductModel>(HTTP_URL + '/product', product);
  }

  public addProductImage(info) {
    console.log(info);
    return this.http.post<ProductModel>(HTTP_URL + '/product/images', info);
  }
}
