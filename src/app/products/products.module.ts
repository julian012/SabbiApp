import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ProductsPage} from './products.page';
import {HttpClientModule} from '@angular/common/http';
import {ModalAddProductPage} from '../modal-add-product/modal-add-product.page';
import {ModalAddProductPageModule} from '../modal-add-product/modal-add-product.module';
import {ProductDetailPage} from './product-detail/product-detail.page';
import {ProductDetailPageModule} from './product-detail/product-detail.module';

const routes: Routes = [
    {
        path: '',
        component: ProductsPage
    }
];

@NgModule({
    entryComponents: [
      ModalAddProductPage,
        ProductDetailPage
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HttpClientModule,
        RouterModule.forChild(routes),
        ModalAddProductPageModule,
        ProductDetailPageModule
    ],
    declarations: [ProductsPage]
})
export class ProductsPageModule {}
