import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HTTP_URL} from '../models/httpStatus';
import {Observable} from 'rxjs';
import {ClientModel} from '../models/Client.model';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(
      private http: HttpClient
  ) { }

  login(nickname: string, password: string): Observable<any> {
    return this.http.post<any>(HTTP_URL + '/report/login', { nickname, password});
  }
}
