import {Component, Input, OnInit} from '@angular/core';
import {SaleDescriptionModel} from '../../models/SaleDescription.model';
import {NumberAsString} from '../../models/NumberAsString';

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
  constructor() {

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

}
