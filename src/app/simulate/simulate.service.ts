import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {API_DOLLAR_URL} from '../models/httpStatus';

@Injectable({
  providedIn: 'root'
})
export class SimulateService {

  constructor( private http: HttpClient) {}

  public getPriceDollar(): Observable<any> {
    const date = new Date();
    const format = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
    return this.http.get<any>('https://free.currconv.com/api/v7/convert?q=USD_COP&compact=ultra&apiKey=c55740ed49ee1ce77484');
  }

}
