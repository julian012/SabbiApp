import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import {Observable} from 'rxjs';
import {SaleModel} from '../models/Sale.model';
import {HTTP_URL} from '../models/httpStatus';
import {SaleFormModel} from '../models/saleForm.model';
import {ClientModel} from '../models/Client.model';
import {PlatformModel} from '../models/Platform.model';


@Injectable({
  providedIn: 'root'
})
export class SalesService {

  public saleList: SaleModel[] = [];
  public saleFormModel = new SaleFormModel();


  constructor(private http: HttpClient,
              private http2: HTTP) { }

  //Retorna la lista de ventas
  public getSales(): Observable<SaleModel[]> {
    return this.http.get<SaleModel[]>(HTTP_URL + '/sale');
  }

  public loadSales() {
    if (!this.saleList[0]){
      this.getSales().subscribe( res => {
        this.saleList = res;
      }, (error: any) => {});
    }
  }

  public getInfoSales() {
    return this.saleList;
  }

  public setClientInfo(client: ClientModel) {
    this.saleFormModel.id_user = client.id_user;
    this.saleFormModel.document_user = client.document_user;
    this.saleFormModel.first_name = client.first_name;
    this.saleFormModel.last_name = client.last_name;
  }

  public setProductInfo(platform: PlatformModel) {
    this.saleFormModel.id_platform = platform.id_platform;
    this.saleFormModel.name_platform = platform.name_platform;
  }

  public setPriceProductInfo(productPrice: any[]) {
    this.saleFormModel.priceProduct = productPrice;
  }

  public cleanSaleForm() {
    this.saleFormModel = new SaleFormModel();
  }

  //Obtener los productos con cantidad disponible
  public getAvailabilityProduct(): Observable<any[]> {
    return this.http.get<any[]>(HTTP_URL +  '/report/product');
  }

  //Obtener las cantidades con las fotos de los productos
  public getProductPrices(id_product: number): Observable<any[]> {
    return this.http.post<any[]>(HTTP_URL + '/report/product_price', {id_product});
  }

  public getSaleFormModel(){
    return this.saleFormModel;
  }
  //Realizar venta
  public makeSale(sale: SaleModel): Observable<any>{
    return this.http.post<any>(HTTP_URL + '/sale', sale);
  }

  //Agregar prodcutos a la venta
  public addProductsToSale(infoSale: any, id_sale: number): Observable<any>{
    console.log(infoSale);
    return this.http.post<any>( HTTP_URL + '/sale_product', {
      id_sale,
      id_product: infoSale.id_product,
      id_product_price: infoSale.id_product_price,
      quantity: infoSale.quantity_select,
      sale_price: infoSale.price_product
    });
  }

  //Descontar los productos comprados en el inventario
  public updateProductPriceList(id_product_price: number, quantity: number): Observable<any> {
    return this.http.put<any>( HTTP_URL + '/product_price', { id_product_price, quantity});
  }



}

