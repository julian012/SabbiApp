import {Component, Input, OnInit} from '@angular/core';
import {SaleDescriptionModel} from '../models/SaleDescription.model';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  @Input() saleInfo: SaleDescriptionModel[];
  constructor() { }

  ngOnInit() {
  }

  public getDate(date: string) {
    const newDate = new Date(date);
    return `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`;
  }

}
