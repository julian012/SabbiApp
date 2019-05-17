import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {PlatformModel} from '../models/Platform.model';
import {HTTP_URL} from '../models/httpStatus';

@Injectable({
  providedIn: 'root'
})
export class PlatformsService {

  constructor(private http : HttpClient) {}

  public getDataPlatforms(): Observable<PlatformModel[]>{
    return this.http.get<PlatformModel[]>(HTTP_URL+'/platforms');
  }
}
