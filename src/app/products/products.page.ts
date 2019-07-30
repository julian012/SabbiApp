import {Component, OnInit} from '@angular/core';
import {ProductsService} from './products.service';
import {ProductModel} from '../models/Product.model';
import {ModalController} from '@ionic/angular';
import {ModalAddProductPage} from '../modal-add-product/modal-add-product.page';
import {PhotoModel} from '../models/Photo.model';
import {ProductPriceModel} from '../models/ProductPrice.model';
import {ProductDetailPage} from './product-detail/product-detail.page';

@Component({
    selector: 'app-products',
    templateUrl: './products.page.html',
    styleUrls: ['./products.page.scss']
})
export class ProductsPage implements OnInit {

    public dataProducts = new Array<ProductModel>();
    public result;
    public values = '';

    constructor(public productsService: ProductsService, private modalController: ModalController) {
    }

    ngOnInit() {
        this.loadProducts();
    }

    public loadProducts() {
        this.productsService.getDataProduct().subscribe(res => {
                this.dataProducts = res;
                this.getImages();
                this.getPrices();
                console.log(this.dataProducts);
            }, (error: any) => {
                this.dataProducts = new Array<ProductModel>();
                this.result = error.message;
            }
        );
    }

    getImages() {
        this.productsService.getProductImage().subscribe(res => {
                this.dataProducts.forEach(product => {
                    product.photos = new Array<PhotoModel>();
                    res.forEach(photo => {
                        if (photo.id_product === product.id_product) {
                            product.photos.push(photo);
                        }
                    });
                });
                this.productsService.setProdcutList(this.dataProducts);
            }, (error: any) => {
                console.log(error.message);
            }
        );
    }

    getPrices() {
        this.productsService.getProductPrice().subscribe(res => {
                this.dataProducts.forEach(product => {
                    product.prices = new Array<ProductPriceModel>();
                    res.forEach(price => {
                        if (price.id_product === product.id_product) {
                            product.prices.push(price);
                        }
                    });
                });
            }, (error: any) => {
                console.log(error.message);
            }
        );
    }

    async addProductPage() {
        const modal = await this.modalController.create({
            component: ModalAddProductPage
        });
        await modal.present();
        const {data} = await modal.onDidDismiss();
        console.log(data);
    }

    filter() {
        this.dataProducts = this.productsService.filterClients(this.values);
    }

    async showDesc(productInfo: ProductModel) {
        const modal = await this.modalController.create({
            component: ProductDetailPage,
            componentProps: {
                product: productInfo
            }
        });
        await modal.present();
    }
}
