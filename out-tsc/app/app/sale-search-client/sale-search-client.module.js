import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SaleSearchClientPage } from './sale-search-client.page';
import { ProgressBarModule } from 'angular-progress-bar';
var routes = [
    {
        path: '',
        component: SaleSearchClientPage
    }
];
var SaleSearchClientPageModule = /** @class */ (function () {
    function SaleSearchClientPageModule() {
    }
    SaleSearchClientPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                ProgressBarModule,
            ],
            declarations: [SaleSearchClientPage]
        })
    ], SaleSearchClientPageModule);
    return SaleSearchClientPageModule;
}());
export { SaleSearchClientPageModule };
//# sourceMappingURL=sale-search-client.module.js.map