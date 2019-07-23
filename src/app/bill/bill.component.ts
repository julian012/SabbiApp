import { Component, OnInit } from '@angular/core';
import {SaleDescriptionModel} from '../models/SaleDescription.model';
import { NumberAsString } from '../models/NumberAsString';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss'],
})

export class BillComponent implements OnInit {

  public sale: SaleDescriptionModel[];
  public day = 0;
  public month = 0;
  public year = 0;
  public total = 0;

  constructor() {
    this.getDate(this.sale[0].sale_date);
    this.sale.forEach(s => {
      this.total += (s.price_product * s.quantity);
    });
  }

  ngOnInit() {}

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
