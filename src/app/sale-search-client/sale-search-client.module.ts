import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SaleSearchClientPage } from './sale-search-client.page';

const routes: Routes = [
  {
    path: '',
    component: SaleSearchClientPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SaleSearchClientPage]
})
export class SaleSearchClientPageModule {}
