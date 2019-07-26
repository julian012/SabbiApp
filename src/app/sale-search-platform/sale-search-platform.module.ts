import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SaleSearchPlatformPage } from './sale-search-platform.page';
import {ProgressBarModule} from 'angular-progress-bar';

const routes: Routes = [
  {
    path: '',
    component: SaleSearchPlatformPage
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
  declarations: [SaleSearchPlatformPage]
})
export class SaleSearchPlatformPageModule {}
