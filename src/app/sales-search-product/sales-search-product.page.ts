import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SalesService} from '../sales/sales.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-sales-search-product',
  templateUrl: './sales-search-product.page.html',
  styleUrls: ['./sales-search-product.page.scss'],
})
export class SalesSearchProductPage implements OnInit {

  private disabled = true;

  constructor(private router: Router,
              private dataSaleService: SalesService,
              public alertCtrl: AlertController) { }

  ngOnInit() {
  }

  public comeback() {
    this.router.navigate(['/sale-search-platform']);
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
