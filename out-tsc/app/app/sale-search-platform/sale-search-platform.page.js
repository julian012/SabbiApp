import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformsService } from '../platforms/platforms.service';
import { SalesService } from '../sales/sales.service';
import { AlertController } from '@ionic/angular';
var SaleSearchPlatformPage = /** @class */ (function () {
    function SaleSearchPlatformPage(router, platformService, dataSaleService, alertCtrl) {
        this.router = router;
        this.platformService = platformService;
        this.dataSaleService = dataSaleService;
        this.alertCtrl = alertCtrl;
        this.disabled = true;
        this.platformList = [];
    }
    SaleSearchPlatformPage.prototype.ngOnInit = function () {
        this.platformList = this.platformService.getPlatforms();
    };
    SaleSearchPlatformPage.prototype.selectPlatform = function (platform) {
        this.platform = platform;
        console.log('Selecciono:', platform.name_platform);
        this.disabled = false;
    };
    SaleSearchPlatformPage.prototype.comeback = function () {
        this.router.navigate(['/sale-search-client']);
    };
    SaleSearchPlatformPage.prototype.showProductSelector = function () {
        this.dataSaleService.setProductInfo(this.platform);
        this.router.navigate(['/sales-search-product']);
    };
    SaleSearchPlatformPage.prototype.comebackHome = function () {
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
    SaleSearchPlatformPage = tslib_1.__decorate([
        Component({
            selector: 'app-sale-search-platform',
            templateUrl: './sale-search-platform.page.html',
            styleUrls: ['./sale-search-platform.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            PlatformsService,
            SalesService,
            AlertController])
    ], SaleSearchPlatformPage);
    return SaleSearchPlatformPage;
}());
export { SaleSearchPlatformPage };
//# sourceMappingURL=sale-search-platform.page.js.map