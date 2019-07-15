import { Component, OnInit } from '@angular/core';
import { ClientService } from './client.service';
import {ClientModel} from '../models/Client.model';
import {FormControl, FormsModule} from '@angular/forms';
import { ModalController} from '@ionic/angular';
import { ClientDetailComponent } from './client-detail/client-detail.component';

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
  public colors = ['1C0B19', '140D4F', '4EA699', '2DD881', '6F3DB7', '2E86AB', 'A23B72', 'F18F01', 'C73E1D', '3B1F2B'];

  constructor( private dataClientService: ClientService,
               private modal: ModalController) {

    this.dataClient = new Array<ClientModel>();
    this.list = new Array<ClientModel>();
    this.searchControl = new FormControl();
  }

  ngOnInit() {
    console.log('Volvio a llamar');
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
    //TODO Pendiente colocar aviso si no encuenta
  }

  public getIcon(gender: string) {
    if (gender.toLowerCase() === 'm') {
      return 'man';
    } else {
      return 'woman';
    }
  }

  public getIconClient(name: string) {
    const rand = this.colors[Math.floor(Math.random() * this.colors.length)];
    return this.dataClientService.getIconClient(name, rand);
  }

  async openClientInfo(info: ClientModel) {
    const modal = await this.modal.create({
      component : ClientDetailComponent,
      componentProps : {
        dataClient : info
      },
      cssClass : 'modalClientInfo'
    });
    return await modal.present();
  }
}
