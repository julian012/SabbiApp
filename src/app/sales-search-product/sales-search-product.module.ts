import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SalesSearchProductPage } from './sales-search-product.page';
import {ProgressBarModule} from 'angular-progress-bar';

const routes: Routes = [
  {
    path: '',
    component: SalesSearchProductPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ProgressBarModule
  ],
  declarations: [SalesSearchProductPage]
})
export class SalesSearchProductPageModule {}
