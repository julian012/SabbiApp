import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PlatformModel} from '../models/Platform.model';
import {AlertController} from '@ionic/angular';
import {ClientService} from '../client/client.service';
import {ClientModel} from '../models/Client.model';
import {SalesService} from '../sales/sales.service';

@Component({
  selector: 'app-sale-search-client',
  templateUrl: './sale-search-client.page.html',
  styleUrls: ['./sale-search-client.page.scss'],
})
export class SaleSearchClientPage implements OnInit {

  private clientList: ClientModel[] = [];
  private disabled = true;
  private client: ClientModel;

  constructor(private router: Router,
              public alertCtrl: AlertController,
              private dataClientService: ClientService,
              private dataSaleService: SalesService) { }

  ngOnInit() {
    this.clientList = this.dataClientService.getClients();
  }

  async exit() {
    const alert = await this.alertCtrl.create({
      header: 'Agregar venta',
      message: `¿Seguro que desea salir?`,
      cssClass: 'options-as-platforms',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',

        }, {
          text: 'Continuar',
          handler: () => {
            this.dataSaleService.cleanSaleForm();
            this.router.navigate(['/sales']);
          }
        }
      ]
    });

    await alert.present();
  }

  public selectClient(client: ClientModel) {
    this.client = client;
    console.log('Selecciono:', client.first_name);
    this.disabled = false;
  }

  public showPlatformSelector() {
    this.dataSaleService.setClientInfo(this.client);
    this.router.navigate(['/sale-search-platform']);
  }



}
