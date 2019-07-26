import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ClientService } from '../client/client.service';
import { SalesService } from '../sales/sales.service';
var SaleSearchClientPage = /** @class */ (function () {
    function SaleSearchClientPage(router, alertCtrl, dataClientService, dataSaleService) {
        this.router = router;
        this.alertCtrl = alertCtrl;
        this.dataClientService = dataClientService;
        this.dataSaleService = dataSaleService;
        this.clientList = [];
        this.disabled = true;
    }
    SaleSearchClientPage.prototype.ngOnInit = function () {
        this.clientList = this.dataClientService.getClients();
    };
    SaleSearchClientPage.prototype.exit = function () {
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
    SaleSearchClientPage.prototype.selectClient = function (client) {
        this.client = client;
        console.log('Selecciono:', client.first_name);
        this.disabled = false;
    };
    SaleSearchClientPage.prototype.showPlatformSelector = function () {
        this.dataSaleService.setClientInfo(this.client);
        this.router.navigate(['/sale-search-platform']);
    };
    SaleSearchClientPage = tslib_1.__decorate([
        Component({
            selector: 'app-sale-search-client',
            templateUrl: './sale-search-client.page.html',
            styleUrls: ['./sale-search-client.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            AlertController,
            ClientService,
            SalesService])
    ], SaleSearchClientPage);
    return SaleSearchClientPage;
}());
export { SaleSearchClientPage };
//# sourceMappingURL=sale-search-client.page.js.map