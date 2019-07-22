import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalAddProductPage } from './modal-add-product.page';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        FormsModule
    ],
  declarations: [ModalAddProductPage]
})
export class ModalAddProductPageModule {}
