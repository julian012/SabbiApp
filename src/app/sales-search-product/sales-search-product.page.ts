import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SalesService} from '../sales/sales.service';
import {AlertController, ModalController} from '@ionic/angular';
import {AddClientFormComponent} from '../client/addclient/add-client-form.component';
import {SalesSearchProductModalComponent} from '../sales-search-product-modal/sales-search-product-modal.component';

@Component({
  selector: 'app-sales-search-product',
  templateUrl: './sales-search-product.page.html',
  styleUrls: ['./sales-search-product.page.scss'],
})
export class SalesSearchProductPage implements OnInit {

  private disabled = true;
  private productList: any[] = [];
  private idPriceList: any[] = [];

  constructor(private router: Router,
              private dataSaleService: SalesService,
              public alertCtrl: AlertController,
              private modal: ModalController) { }

  ngOnInit() {
    this.dataSaleService.getAvailabilityProduct().subscribe( res => {
      this.productList = res;
    });
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

  public getIcon(gender: string) {
    if (gender.toLowerCase() === 'm') {
      return 'man';
    } else {
      return 'woman';
    }
  }


  public selectProduct(product: any) {
    if (!product.status_product) {
      console.log('Selecciono' + product.name_product);
      this.selectProductOption(product);
    }
  }

  async selectProductOption(product: any) {
    const modal = await this.modal.create({
      component : SalesSearchProductModalComponent,
      cssClass : 'modalSearchProduct',
      componentProps : {
        productInfo : product,
        saleSearchPage : this
      },
    });
    await modal.present();
  }

  public getIdProduct(productPrice: any) {
    console.log('llego ', productPrice);
    this.modal.dismiss();
    this.idPriceList.push(productPrice);
    this.productList.forEach( product => {
      if (product.id_product === productPrice.id_product) {
        product.status_product = true;
      }
    });
    this.validatePriceProductList();
  }

  public deleteIdPrice(productPrice: any) {
    this.idPriceList.splice(productPrice, 1);
    this.productList.forEach( product => {
      if (product.id_product === productPrice.id_product) {
        product.status_product = false;
      }
    });
    this.validatePriceProductList();
  }

  public validatePriceProductList() {
    if (this.idPriceList.length > 0) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  public sendProductPriceInfo() {
    this.dataSaleService.setPriceProductInfo(this.idPriceList);
    this.router.navigate(['/sale-confirm']);
  }









}
