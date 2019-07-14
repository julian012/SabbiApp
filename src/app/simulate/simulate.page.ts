import { Component, OnInit } from '@angular/core';
import { SimulateService } from './simulate.service';
import { AlertController, } from '@ionic/angular';

@Component({
  selector: 'app-simulate',
  templateUrl: './simulate.page.html',
  styleUrls: ['./simulate.page.scss'],
})
export class SimulatePage implements OnInit {

  public dollarPrice = 0;
  public priceProduct = 0;
  public sendPrice = 0;
  public gain = 40;
  public result = 0;
  public resultDollar = 0;

  constructor(
      private dataSimulateService: SimulateService,
      public alertCtrl: AlertController) { }

  ngOnInit() {
    this.loadDollarPrice();
    this.result = this.priceProduct + this.sendPrice;
  }

  public loadDollarPrice(): void {
    this.dataSimulateService.getPriceDollar().subscribe(res => {
          console.log('llego resultado del API');
          this.dollarPrice = res.USD_COP;
        }, (error: any) => {
          console.log(error);
        }
    );
  }

  public calculatePrice(): void {
    this.result = Math.round(((this.priceProduct * 1) + (this.sendPrice * 1)) * (this.dollarPrice) * (1 + (this.gain / 100 )) );
    this.resultDollar = Math.round((this.priceProduct * 1) + (this.sendPrice * 1) * (1 + (this.gain / 100 )));
  }

  public showTutorialPage() {
    this.showMessage('Mensaje','Tutorial simulación', 'El precio del dolar va a estar actualizado al dia, pero lo puede modificar');
  }

  async showMessage(header, subHeader, message){
    const alert = await this.alertCtrl.create({
      header,
      subHeader,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
