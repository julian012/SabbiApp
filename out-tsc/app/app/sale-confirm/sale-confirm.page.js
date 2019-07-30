import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SalesService } from '../sales/sales.service';
import { ActionSheetController, AlertController, LoadingController } from '@ionic/angular';
import { SaleModel } from '../models/Sale.model';
var SaleConfirmPage = /** @class */ (function () {
    function SaleConfirmPage(router, dataSaleService, alertCtrl, loadingController, actionSheetCtrl) {
        this.router = router;
        this.dataSaleService = dataSaleService;
        this.alertCtrl = alertCtrl;
        this.loadingController = loadingController;
        this.actionSheetCtrl = actionSheetCtrl;
        this.disabled = true;
    }
    SaleConfirmPage.prototype.ngOnInit = function () {
        this.infoSale = this.dataSaleService.getSaleFormModel();
    };
    SaleConfirmPage.prototype.comeback = function () {
        this.router.navigate(['/sales-search-product']);
    };
    SaleConfirmPage.prototype.comebackHome = function () {
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
    SaleConfirmPage.prototype.makeSale = function () {
        var _this = this;
        var sale = new SaleModel();
        var date = new Date();
        sale.id_sale = -1;
        sale.id_platform = this.infoSale.id_platform;
        sale.id_user = this.infoSale.id_user;
        sale.sale_date = date.toISOString();
        this.dataSaleService.makeSale(sale).subscribe(function (res) {
            sale.id_sale = res.id_sale;
            _this.infoSale.priceProduct.forEach(function (product) {
                _this.dataSaleService.addProductsToSale(product, res.id_sale).subscribe(function (response) {
                    _this.dataSaleService.updateProductPriceList(product.id_product_price, product.quantity - product.quantity_select)
                        .subscribe(function (resp) {
                        console.log('Buena');
                    });
                });
            });
        });
        this.saveSaleLoading();
        this.showMessage('Agregar venta', 'Venta guardada correctamente', 'La factura la encontrara en el menu principal.');
        this.router.navigate(['/sales']);
    };
    SaleConfirmPage.prototype.showMessage = function (header, subHeader, message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: header,
                            subHeader: subHeader,
                            message: message,
                            buttons: ['OK']
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
    SaleConfirmPage.prototype.saveSaleLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: 'Procesando',
                            duration: 5000
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SaleConfirmPage = tslib_1.__decorate([
        Component({
            selector: 'app-sale-confirm',
            templateUrl: './sale-confirm.page.html',
            styleUrls: ['./sale-confirm.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            SalesService,
            AlertController,
            LoadingController,
            ActionSheetController])
    ], SaleConfirmPage);
    return SaleConfirmPage;
}());
export { SaleConfirmPage };
//# sourceMappingURL=sale-confirm.page.js.map