import {Component, Input, OnInit} from '@angular/core';
import {SalesSearchProductPage} from '../sales-search-product/sales-search-product.page';
import {SalesService} from '../sales/sales.service';

@Component({
  selector: 'app-sales-search-product-modal',
  templateUrl: './sales-search-product-modal.component.html',
  styleUrls: ['./sales-search-product-modal.component.scss'],
})
export class SalesSearchProductModalComponent implements OnInit {

  public disabled = true;
  public productPriceList: any[] = [];
  @Input() productInfo: any;
  @Input() saleSearchPage: SalesSearchProductPage;
  constructor(private dataSaleService: SalesService) {

  }

  ngOnInit() {
    console.log(this.productInfo);
    this.dataSaleService.getProductPrices(this.productInfo.id_product).subscribe( res => {
      console.log(res);
      this.productPriceList = res;
    });
  }

}
