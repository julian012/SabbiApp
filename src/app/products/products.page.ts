import {Component, OnInit} from '@angular/core';
import {ProductsService} from './products.service';
import {ProductModel} from '../models/Product.model';

@Component({
    selector: 'app-products',
    templateUrl: './products.page.html',
    styleUrls: ['./products.page.scss'],
    providers: [ProductsService]
})
export class ProductsPage implements OnInit {

    // @ts-ignore
    public dataProducts: Array<ProductModel>;
    public result;

    constructor(public productsService: ProductsService) {
        this.dataProducts = new Array<ProductModel>();
    }

    ngOnInit() {
        this.loadProducts();
    }

    public loadProducts() {
        this.productsService.getDataProduct().subscribe(res => {
                this.dataProducts = res;
                console.log(this.dataProducts);
            }, (error: any) => {
                this.dataProducts = new Array<ProductModel>();
                this.result = error.message;
            }
        );
    }

}
