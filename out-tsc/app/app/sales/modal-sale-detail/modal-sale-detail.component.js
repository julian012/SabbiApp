import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { NumberAsString } from '../../models/NumberAsString';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SalesPage } from '../sales.page';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { AlertController } from '@ionic/angular';
var ModalSaleDetailComponent = /** @class */ (function () {
    function ModalSaleDetailComponent(screenOrientation, screenshot, alertCtrl) {
        this.screenOrientation = screenOrientation;
        this.screenshot = screenshot;
        this.alertCtrl = alertCtrl;
        this.day = 0;
        this.month = 0;
        this.year = 0;
        this.total = 0;
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }
    ModalSaleDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getDate(this.saleInfo[0].sale_date);
        this.saleInfo.forEach(function (s) {
            _this.total += (s.price_product * s.quantity);
        });
        this.getTotalString();
    };
    ModalSaleDetailComponent.prototype.getDate = function (date) {
        var newDate = new Date(date);
        this.day = newDate.getDate();
        this.month = newDate.getMonth();
        this.year = newDate.getFullYear();
    };
    ModalSaleDetailComponent.prototype.getTotalString = function () {
        return NumberAsString(this.total, false, {});
    };
    ModalSaleDetailComponent.prototype.dismiss = function () {
        this.screenOrientation.unlock();
        this.salePage.dismissModal();
    };
    ModalSaleDetailComponent.prototype.capture = function () {
        var _this = this;
        var name = this.saleInfo[0].first_name + '-' + this.saleInfo[0].last_name + '-fv-' + this.saleInfo[0].id_sale + '.jpg';
        this.screenshot.save('jpg', 100, name).then(function (onSuccess) {
            _this.showMessage('Guardar Factura', "Factura: 0" + _this.saleInfo[0].id_sale, 'Guardada correctamente');
        }, onerror);
    };
    ModalSaleDetailComponent.prototype.showMessage = function (header, subHeader, message) {
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
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], ModalSaleDetailComponent.prototype, "saleInfo", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", SalesPage)
    ], ModalSaleDetailComponent.prototype, "salePage", void 0);
    ModalSaleDetailComponent = tslib_1.__decorate([
        Component({
            selector: 'app-modal-sale-detail',
            templateUrl: './modal-sale-detail.component.html',
            styleUrls: ['./modal-sale-detail.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ScreenOrientation, Screenshot,
            AlertController])
    ], ModalSaleDetailComponent);
    return ModalSaleDetailComponent;
}());
export { ModalSaleDetailComponent };
//# sourceMappingURL=modal-sale-detail.component.js.map