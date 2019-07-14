import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientModel} from '../models/Client.model';
import {HTTP_URL} from '../models/httpStatus';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor( private http: HttpClient ) { }

  public getDataClients(): Observable<ClientModel[]> {
    return this.http.get<ClientModel[]>( HTTP_URL + '/client');
  }

  public filterItems(value: string, array: Array<ClientModel>) {
    return array.filter( client => {
      const fullName = client.first_name.toLowerCase() + ' ' + client.last_name.toLowerCase();
      return fullName.indexOf(value.toLowerCase()) > -1;
    });
  }

  public getIconClient( name: string) {
    const alternative = 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&bold=true&rounded=true&name=';
    return alternative + name;
  }
}
