import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HTTP_URL } from '../models/httpStatus';
import { GarmentModel } from '../models/Garment.model';

@Injectable({
  providedIn: 'root'
})
export class GarmentService {

  constructor(private http: HttpClient) { }

  public getGarments(): Observable<GarmentModel[]> {
    return this.http.get<GarmentModel[]>(HTTP_URL + '/garment');
  }
}
