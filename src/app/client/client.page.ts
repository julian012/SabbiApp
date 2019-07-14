import { Component, OnInit } from '@angular/core';
import { ClientService } from './client.service';
import {ClientModel} from '../models/Client.model';
import {FormControl, FormsModule} from '@angular/forms';
import {debounce, debounceTime} from 'rxjs/operators';


@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {

  public dataClient: Array<ClientModel>;
  public list: Array<ClientModel>;
  public values = '';
  public searchControl: FormControl;

  constructor( private dataClientService: ClientService) {
    this.dataClient = new Array<ClientModel>();
    this.list = new Array<ClientModel>();
    this.searchControl = new FormControl();
  }

  ngOnInit() {
    this.loadClients();
  }

  public loadClients(): void {
    this.dataClientService.getDataClients().subscribe(res => {
          this.dataClient = res;
          this.list = res;
        },
        (error: any) => {
          this.dataClient = new Array<ClientModel>();
    });
  }

  public getClients(): void {
    if (this.values === '') {
      this.list = this.dataClient;
    } else {
      this.list = this.dataClientService.filterItems(this.values, this.dataClient);
    }
  }

  public getIcon(gender: string) {
    if (gender.toLowerCase() === 'm') {
      return 'man';
    } else {
      return 'woman';
    }
  }

  public getIconClient(name: string) {
    return this.dataClientService.getIconClient(name);
  }
}
