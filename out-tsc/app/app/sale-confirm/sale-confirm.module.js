import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SaleConfirmPage } from './sale-confirm.page';
import { ProgressBarModule } from 'angular-progress-bar';
var routes = [
    {
        path: '',
        component: SaleConfirmPage
    }
];
var SaleConfirmPageModule = /** @class */ (function () {
    function SaleConfirmPageModule() {
    }
    SaleConfirmPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                ProgressBarModule
            ],
            declarations: [SaleConfirmPage]
        })
    ], SaleConfirmPageModule);
    return SaleConfirmPageModule;
}());
export { SaleConfirmPageModule };
//# sourceMappingURL=sale-confirm.module.js.map