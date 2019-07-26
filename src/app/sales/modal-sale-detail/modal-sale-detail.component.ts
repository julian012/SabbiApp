import {Component, Input, OnInit} from '@angular/core';
import {SaleDescriptionModel} from '../../models/SaleDescription.model';
import {NumberAsString} from '../../models/NumberAsString';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import {SalesPage} from '../sales.page';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-modal-sale-detail',
  templateUrl: './modal-sale-detail.component.html',
  styleUrls: ['./modal-sale-detail.component.scss'],
})
export class ModalSaleDetailComponent implements OnInit {

  public day = 0;
  public month = 0;
  public year = 0;
  public total = 0;

  @Input() saleInfo: SaleDescriptionModel[];
  @Input() salePage: SalesPage;
  constructor(private screenOrientation: ScreenOrientation, private screenshot: Screenshot,
              public alertCtrl: AlertController) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  ngOnInit() {
    this.getDate(this.saleInfo[0].sale_date);
    this.saleInfo.forEach(s => {
      this.total += (s.price_product * s.quantity);
    });
    this.getTotalString();
  }

  public getDate(date: string) {
    const newDate = new Date(date);
    this.day = newDate.getDate();
    this.month = newDate.getMonth();
    this.year = newDate.getFullYear();
  }

  public getTotalString() {
    return NumberAsString(this.total, false, {});
  }

  public dismiss() {
    this.screenOrientation.unlock();
    this.salePage.dismissModal();
  }

  public capture() {
    const name = this.saleInfo[0].first_name + '-' + this.saleInfo[0].last_name + '-fv-' + this.saleInfo[0].id_sale + '.jpg';
    this.screenshot.save('jpg', 100, name).then(onSuccess => {
      this.showMessage('Guardar Factura', `Factura: 0${this.saleInfo[0].id_sale}`, 'Guardada correctamente');
    }, onerror);
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

}
