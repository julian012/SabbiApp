import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PlatformModel} from '../models/Platform.model';
import { PlatformsService } from '../platforms/platforms.service';
import {ClientModel} from '../models/Client.model';
import {SalesService} from '../sales/sales.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-sale-search-platform',
  templateUrl: './sale-search-platform.page.html',
  styleUrls: ['./sale-search-platform.page.scss'],
})
export class SaleSearchPlatformPage implements OnInit {

  private disabled = true;
  private platformList: PlatformModel[] = [];
  private platform: PlatformModel;

  constructor(private router: Router,
              private platformService: PlatformsService,
              private dataSaleService: SalesService,
              public alertCtrl: AlertController) { }

  ngOnInit() {
    this.platformList = this.platformService.getPlatforms();
  }

  public selectPlatform(platform: PlatformModel) {
    this.platform = platform;
    console.log('Selecciono:', platform.name_platform);
    this.disabled = false;
  }

  public comeback() {
    this.router.navigate(['/sale-search-client']);
  }

  public showProductSelector() {
    this.dataSaleService.setProductInfo(this.platform);
    this.router.navigate(['/sales-search-product']);
  }

  async comebackHome() {
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

}
