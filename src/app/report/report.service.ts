import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HTTP_URL} from '../models/httpStatus';
import {Observable} from 'rxjs';
import {SaleDescriptionModel} from '../models/SaleDescription.model';
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  //Obtener los prodictos de la venta
  public getDescriptionSale(id_sale: number): Observable<SaleDescriptionModel[]> {
    return this.http.post<SaleDescriptionModel[]>(HTTP_URL + '/report/sale', {id_sale});
  }
}
