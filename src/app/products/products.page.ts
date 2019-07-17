import {Component, OnInit} from '@angular/core';
import {ProductsService} from './products.service';
import {ProductModel} from '../models/Product.model';
import { ModalController } from '@ionic/angular';
import {ModalAddProductPage} from '../modal-add-product/modal-add-product.page';

@Component({
    selector: 'app-products',
    templateUrl: './products.page.html',
    styleUrls: ['./products.page.scss']
})
export class ProductsPage implements OnInit {

    public dataProducts: Array<ProductModel>;
    public result;

    constructor(public productsService: ProductsService, private modalController: ModalController) {
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

    async addProductPage() {
        const modal = await this.modalController.create({
            component: ModalAddProductPage
        });
        await modal.present();
        const { data } = await modal.onDidDismiss();
        console.log(data);
    }
}
