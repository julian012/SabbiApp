import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientModel} from '../models/Client.model';
import {HTTP_URL, CLIENT_ROUTING, PHONE_ROUTING} from '../models/httpStatus';
import {PhoneModel} from '../models/Phone.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public colors = ['52AA5E', 'F0EC57', '4EA699', '2DD881', '6F3DB7', '2E86AB', 'A23B72', 'F18F01', 'CCFCCB', '23C9FF'];
  public clientList: ClientModel[] = [];
  public list: ClientModel[];

  constructor( private http: HttpClient ) {
  }

  public getClients() {
    return this.list;
  }

  public loadClients() {
    if (!this.clientList[0]) {
      this.getDataClients().subscribe(res => {
            this.clientList = res;
            this.clientList.forEach( client => {
              client.color = this.colors[Math.floor(Math.random() * this.colors.length)];
            });
            this.list = this.clientList;
        },
          (error: any) => {
      });
    }
  }

  public addClientToList(client: ClientModel) {
    client.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.clientList.push(client);
    this.list = this.clientList;
  }

  public filterClients(value: string) {
    if (value === '') {
      this.list = this.clientList;
    } else {
      this.list = this.filterItems(value);
    }
    return this.list;
  }

  public getDataClients(): Observable<ClientModel[]> {
    return this.http.get<ClientModel[]>( HTTP_URL + '/client');
  }

  public filterItems(value: string) {
    return this.clientList.filter( client => {
      const fullName = client.first_name.toLowerCase() + ' ' + client.last_name.toLowerCase();
      return fullName.indexOf(value.toLowerCase()) > -1;
    });
  }

  public getIconClient( client: ClientModel) {
    const res = client.first_name.split(' ').join('+');
    const alternative = `https://ui-avatars.com/api/?background=${client.color}&size=64&color=fff&bold=true&rounded=true&name=${res}`;
    return alternative;
  }

  // Actualizar los datos del cliente
  public updateClient(client: ClientModel): Observable<ClientModel> {
    this.clientList.forEach( i => {
      if (i.id_user === client.id_user) {
        i = client;
        console.log('Se encontro, ahora se va a realizar el cambio');
        return this.http.put<ClientModel>( HTTP_URL + CLIENT_ROUTING, i);
      }
    });
    return  this.http.put<ClientModel>( HTTP_URL + CLIENT_ROUTING, client);
  }

  // Agregar telefono
  public addPhone(id_user: number, number_phone: string): Observable<PhoneModel> {
    return this.http.post<PhoneModel>( HTTP_URL + PHONE_ROUTING, { id_user, number_phone });
  }

  // Modificar telefono
  public updatePhone(phone: PhoneModel): Observable<PhoneModel> {
    return this.http.put<PhoneModel>( HTTP_URL + PHONE_ROUTING + CLIENT_ROUTING, phone);
  }

  // Eliminar telefono
  public deletePhone(phone: PhoneModel): Observable<PhoneModel> {
    return this.http.post<PhoneModel>( HTTP_URL + PHONE_ROUTING + '/delete', phone);
  }

  //Agregar cliente
  public addClient(client: ClientModel): Observable<any> {
    return this.http.post<any>(HTTP_URL + CLIENT_ROUTING, client);
  }

}
