import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientModel} from '../models/Client.model';
import {HTTP_URL} from '../models/httpStatus';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public colors = ['1C0B19', '140D4F', '4EA699', '2DD881', '6F3DB7', '2E86AB', 'A23B72', 'F18F01', 'C73E1D', '3B1F2B'];
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
}
