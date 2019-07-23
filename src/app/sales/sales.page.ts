import { Component, OnInit } from '@angular/core';
import {SaleModel} from '../models/Sale.model';
import {SalesService} from './sales.service';
import {ReportService} from '../report/report.service';
import {SaleDescriptionModel} from '../models/SaleDescription.model';
import {ReportPage} from '../report/report.page';
import {ModalController} from '@ionic/angular';
import {ModalSaleDetailComponent} from './modal-sale-detail/modal-sale-detail.component';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {

  private salesList: any[] = [];
  private saleDescription: SaleDescriptionModel[] = [];

  constructor(private dataSalesService: SalesService,
              private dataReportService: ReportService,
              private modal: ModalController) {
  }

  ngOnInit() {
    this.dataReportService.getPreliminarList().subscribe( res => {
      this.salesList = res;
    });
  }

  public getDate(date: string) {
    const newDate = new Date(date);
    return `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`;
  }

  public showDetails(id_sale: number) {
    this.dataReportService.getDescriptionSale(id_sale).subscribe( res => {
      this.saleDescription = res;
      this.showSale();
    });
  }

  async showSale() {
    const modal = await this.modal.create({
      component : ModalSaleDetailComponent,
      cssClass : 'modalSaleDetailInfo',
      componentProps : {
        saleInfo : this.saleDescription
      },
    });
    await modal.present();
  }

}
