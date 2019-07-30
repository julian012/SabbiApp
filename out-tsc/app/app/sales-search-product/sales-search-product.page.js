import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SalesService } from '../sales/sales.service';
import { AlertController, ModalController } from '@ionic/angular';
import { SalesSearchProductModalComponent } from '../sales-search-product-modal/sales-search-product-modal.component';
var SalesSearchProductPage = /** @class */ (function () {
    function SalesSearchProductPage(router, dataSaleService, alertCtrl, modal) {
        this.router = router;
        this.dataSaleService = dataSaleService;
        this.alertCtrl = alertCtrl;
        this.modal = modal;
        this.disabled = true;
        this.productList = [];
        this.idPriceList = [];
    }
    SalesSearchProductPage.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSaleService.getAvailabilityProduct().subscribe(function (res) {
            _this.productList = res;
        });
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
    SalesSearchProductPage.prototype.getIcon = function (gender) {
        if (gender.toLowerCase() === 'm') {
            return 'man';
        }
        else {
            return 'woman';
        }
    };
    SalesSearchProductPage.prototype.selectProduct = function (product) {
        if (!product.status_product) {
            console.log('Selecciono' + product.name_product);
            this.selectProductOption(product);
        }
    };
    SalesSearchProductPage.prototype.selectProductOption = function (product) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modal.create({
                            component: SalesSearchProductModalComponent,
                            cssClass: 'modalSearchProduct',
                            componentProps: {
                                productInfo: product,
                                saleSearchPage: this
                            },
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SalesSearchProductPage.prototype.getIdProduct = function (productPrice) {
        console.log('llego ', productPrice);
        this.modal.dismiss();
        this.idPriceList.push(productPrice);
        this.productList.forEach(function (product) {
            if (product.id_product === productPrice.id_product) {
                product.status_product = true;
            }
        });
        this.validatePriceProductList();
    };
    SalesSearchProductPage.prototype.deleteIdPrice = function (productPrice) {
        this.idPriceList.splice(productPrice, 1);
        this.productList.forEach(function (product) {
            if (product.id_product === productPrice.id_product) {
                product.status_product = false;
            }
        });
        this.validatePriceProductList();
    };
    SalesSearchProductPage.prototype.validatePriceProductList = function () {
        if (this.idPriceList.length > 0) {
            this.disabled = false;
        }
        else {
            this.disabled = true;
        }
    };
    SalesSearchProductPage.prototype.sendProductPriceInfo = function () {
        this.dataSaleService.setPriceProductInfo(this.idPriceList);
        this.router.navigate(['/sale-confirm']);
    };
    SalesSearchProductPage = tslib_1.__decorate([
        Component({
            selector: 'app-sales-search-product',
            templateUrl: './sales-search-product.page.html',
            styleUrls: ['./sales-search-product.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            SalesService,
            AlertController,
            ModalController])
    ], SalesSearchProductPage);
    return SalesSearchProductPage;
}());
export { SalesSearchProductPage };
//# sourceMappingURL=sales-search-product.page.js.map