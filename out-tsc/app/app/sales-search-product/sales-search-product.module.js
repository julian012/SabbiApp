import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SalesSearchProductPage } from './sales-search-product.page';
import { ProgressBarModule } from 'angular-progress-bar';
var routes = [
    {
        path: '',
        component: SalesSearchProductPage
    }
];
var SalesSearchProductPageModule = /** @class */ (function () {
    function SalesSearchProductPageModule() {
    }
    SalesSearchProductPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                ProgressBarModule
            ],
            declarations: [SalesSearchProductPage]
        })
    ], SalesSearchProductPageModule);
    return SalesSearchProductPageModule;
}());
export { SalesSearchProductPageModule };
//# sourceMappingURL=sales-search-product.module.js.map