import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SaleModel} from '../models/Sale.model';
import {HTTP_URL} from '../models/httpStatus';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  public saleList: SaleModel[] = [];

  constructor(private http: HttpClient) { }

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
}

