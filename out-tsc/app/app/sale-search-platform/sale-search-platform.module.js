import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SaleSearchPlatformPage } from './sale-search-platform.page';
import { ProgressBarModule } from 'angular-progress-bar';
var routes = [
    {
        path: '',
        component: SaleSearchPlatformPage
    }
];
var SaleSearchPlatformPageModule = /** @class */ (function () {
    function SaleSearchPlatformPageModule() {
    }
    SaleSearchPlatformPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                ProgressBarModule
            ],
            declarations: [SaleSearchPlatformPage]
        })
    ], SaleSearchPlatformPageModule);
    return SaleSearchPlatformPageModule;
}());
export { SaleSearchPlatformPageModule };
//# sourceMappingURL=sale-search-platform.module.js.map