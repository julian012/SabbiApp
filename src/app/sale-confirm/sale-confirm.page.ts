import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SalesService} from '../sales/sales.service';
import {ActionSheetController, AlertController, LoadingController} from '@ionic/angular';
import {SaleDescriptionModel} from '../models/SaleDescription.model';
import {SaleFormModel} from '../models/saleForm.model';
import {SaleModel} from '../models/Sale.model';

@Component({
  selector: 'app-sale-confirm',
  templateUrl: './sale-confirm.page.html',
  styleUrls: ['./sale-confirm.page.scss'],
})
export class SaleConfirmPage implements OnInit {

  public disabled = true;
  public infoSale: SaleFormModel;

  constructor(private  router: Router,
              private dataSaleService: SalesService,
              public alertCtrl: AlertController,
              public loadingController: LoadingController,
              private actionSheetCtrl: ActionSheetController) {
  }

  ngOnInit() {
    this.infoSale = this.dataSaleService.getSaleFormModel();
  }

  public comeback() {
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

  public makeSale() {
    const sale = new SaleModel();
    const date = new Date();
    sale.id_sale = -1;
    sale.id_platform = this.infoSale.id_platform;
    sale.id_user = this.infoSale.id_user;
    sale.sale_date = date.toISOString();
    this.dataSaleService.makeSale(sale).subscribe( res => {
      sale.id_sale = res.id_sale;
      this.infoSale.priceProduct.forEach( product => {
        this.dataSaleService.addProductsToSale(product, res.id_sale).subscribe( response => {
            this.dataSaleService.updateProductPriceList(product.id_product_price, product.quantity - product.quantity_select)
                .subscribe( resp => {
                  console.log('Buena');
                });
        });
      });
    });
    this.saveSaleLoading();
    this.showMessage('Agregar venta', 'Venta guardada correctamente', 'La factura la encontrara en el menu principal.');
    this.router.navigate(['/sales']);
  }

  async showMessage(header, subHeader, message) {
    const alert = await this.alertCtrl.create({
      header,
      subHeader,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async saveSaleLoading() {
    const loading = await this.loadingController.create({
      message: 'Procesando',
      duration: 5000
    });
    await loading.present();
  }
}
