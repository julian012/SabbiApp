import { Injectable } from '@angular/core';
import {CLIENT_ROUTING, HTTP_URL, PHONE_ROUTING, SALE_ROUTING} from '../../models/httpStatus';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SaleModel} from '../../models/Sale.model';
import {PhoneModel} from '../../models/Phone.model';
import {ClientModel} from '../../models/Client.model';


@Injectable({
  providedIn: 'root'
})
export class ClientDetailService {

  constructor(private http: HttpClient) { }

  public getSales(idUser: number): Observable<SaleModel[]> {
    return this.http.post<SaleModel[]>(HTTP_URL +  SALE_ROUTING + CLIENT_ROUTING, {id_user : idUser});
  }

  //Obtener los numeros de telefono de la persona
  public getPhoneNumber(idUser: number): Observable<PhoneModel[]> {
    return this.http.post<PhoneModel[]>( HTTP_URL + PHONE_ROUTING + CLIENT_ROUTING, { id_user : idUser});
  }

  public getIconClient( client: ClientModel) {
    const res = client.first_name.split(' ').join('+');
    const alternative = `https://ui-avatars.com/api/?background=${client.color}&size=64&color=fff&bold=true&rounded=true&name=${res}`;
    return alternative;
  }
}
