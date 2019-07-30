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
  public priceSelected: any;
  public quantity = 1;
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

  public getIdPrice(product: any) {
    this.priceSelected = product;
    this.disabled = false;
  }

  public sendProductPrice() {
    this.saleSearchPage.getIdProduct(this.priceSelected);
  }

  public changeQuantity(option: boolean, product: any){
    //Agregar
    if (option) {
      if (product.quantity_select < product.quantity){
        product.quantity_select++;
      }
    } else { //Restar
      if ((product.quantity_select - 1) !== 0) {
        product.quantity_select--;
      }
    }
  }








}
