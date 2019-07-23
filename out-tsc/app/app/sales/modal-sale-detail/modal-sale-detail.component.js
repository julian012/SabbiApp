import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { NumberAsString } from '../../models/NumberAsString';
var ModalSaleDetailComponent = /** @class */ (function () {
    function ModalSaleDetailComponent() {
        this.day = 0;
        this.month = 0;
        this.year = 0;
        this.total = 0;
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
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], ModalSaleDetailComponent.prototype, "saleInfo", void 0);
    ModalSaleDetailComponent = tslib_1.__decorate([
        Component({
            selector: 'app-modal-sale-detail',
            templateUrl: './modal-sale-detail.component.html',
            styleUrls: ['./modal-sale-detail.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ModalSaleDetailComponent);
    return ModalSaleDetailComponent;
}());
export { ModalSaleDetailComponent };
//# sourceMappingURL=modal-sale-detail.component.js.map