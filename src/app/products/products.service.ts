import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Observable } from 'rxjs';
import {PlatformModel} from '../models/Platform.model';
import {HTTP_URL} from '../models/httpStatus';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http2: HTTP,
              private http: HttpClient) {}

  public getDataProduct(): Observable<PlatformModel[]> {
    return this.http.get<PlatformModel[]>(HTTP_URL + '/product');
  }
}
