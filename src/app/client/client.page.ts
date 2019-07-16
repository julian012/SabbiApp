import { Component, OnInit } from '@angular/core';
import { ClientService } from './client.service';
import {ClientModel} from '../models/Client.model';
import { ModalController} from '@ionic/angular';
import { ClientDetailComponent } from './client-detail/client-detail.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})

export class ClientPage implements OnInit {
  public list: ClientModel[];
  public values = '';

  constructor( private dataClientService: ClientService,
               private modal: ModalController) {
    this.list = this.dataClientService.getClients();
  }

  ngOnInit() {}
  public filter(): void {
    this.list = this.dataClientService.filterClients(this.values);
    // TODO Pendiente colocar aviso si no encuenta
  }

  public getIcon(gender: string) {
    if (gender.toLowerCase() === 'm') {
      return 'man';
    } else {
      return 'woman';
    }
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

  public getIconClient(client : ClientModel) {
    return this.dataClientService.getIconClient(client);
  }
}
