import { Injectable } from '@angular/core';
import {HTTP_URL} from '../models/httpStatus';
import {HttpClient} from '@angular/common/http';
import {ProductModel} from '../models/Product.model';
import {ProductPriceModel} from '../models/ProductPrice.model';

@Injectable({
  providedIn: 'root'
})
export class ModalAddProductService {

  constructor(private http: HttpClient) { }

  public createProduct(product: ProductModel) {
    console.log(product);
    return this.http.post(HTTP_URL + '/product', product);
  }

  public createPriceProduct(product: ProductPriceModel) {
    console.log(product);
    return this.http.post(HTTP_URL + '/product_price', product);
  }

  public addProductImage(info) {
    console.log(info);
    return this.http.post(HTTP_URL + '/product/images', info);
  }
}
