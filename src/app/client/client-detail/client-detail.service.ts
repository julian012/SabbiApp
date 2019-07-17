import { Injectable } from '@angular/core';
import {HTTP_URL} from '../../models/httpStatus';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SaleModel} from '../../models/Sale.model';


@Injectable({
  providedIn: 'root'
})
export class ClientDetailService {

  constructor(private http: HttpClient) { }

  public getSales(idUser: number): Observable<SaleModel> {
    return this.http.post<SaleModel>(HTTP_URL + 'sale/client', {id_user : idUser});
  }
}
