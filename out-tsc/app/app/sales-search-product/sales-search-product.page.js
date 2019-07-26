import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SalesService } from '../sales/sales.service';
import { AlertController } from '@ionic/angular';
var SalesSearchProductPage = /** @class */ (function () {
    function SalesSearchProductPage(router, dataSaleService, alertCtrl) {
        this.router = router;
        this.dataSaleService = dataSaleService;
        this.alertCtrl = alertCtrl;
        this.disabled = true;
    }
    SalesSearchProductPage.prototype.ngOnInit = function () {
    };
    SalesSearchProductPage.prototype.comeback = function () {
        this.router.navigate(['/sale-search-platform']);
    };
    SalesSearchProductPage.prototype.comebackHome = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Agregar venta',
                            message: "\u00BFSeguro que desea salir?",
                            cssClass: 'options-as-platforms',
                            buttons: [
                                {
                                    text: 'Cancelar',
                                    role: 'cancel',
                                }, {
                                    text: 'Continuar',
                                    handler: function () {
                                        _this.dataSaleService.cleanSaleForm();
                                        _this.router.navigate(['/sales']);
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SalesSearchProductPage = tslib_1.__decorate([
        Component({
            selector: 'app-sales-search-product',
            templateUrl: './sales-search-product.page.html',
            styleUrls: ['./sales-search-product.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            SalesService,
            AlertController])
    ], SalesSearchProductPage);
    return SalesSearchProductPage;
}());
export { SalesSearchProductPage };
//# sourceMappingURL=sales-search-product.page.js.map