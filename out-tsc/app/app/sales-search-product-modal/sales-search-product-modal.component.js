import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { SalesSearchProductPage } from '../sales-search-product/sales-search-product.page';
import { SalesService } from '../sales/sales.service';
var SalesSearchProductModalComponent = /** @class */ (function () {
    function SalesSearchProductModalComponent(dataSaleService) {
        this.dataSaleService = dataSaleService;
        this.disabled = true;
        this.productPriceList = [];
        this.quantity = 1;
    }
    SalesSearchProductModalComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log(this.productInfo);
        this.dataSaleService.getProductPrices(this.productInfo.id_product).subscribe(function (res) {
            console.log(res);
            _this.productPriceList = res;
        });
    };
    SalesSearchProductModalComponent.prototype.getIdPrice = function (product) {
        this.priceSelected = product;
        this.disabled = false;
    };
    SalesSearchProductModalComponent.prototype.sendProductPrice = function () {
        this.saleSearchPage.getIdProduct(this.priceSelected);
    };
    SalesSearchProductModalComponent.prototype.changeQuantity = function (option, product) {
        //Agregar
        if (option) {
            if (product.quantity_select < product.quantity) {
                product.quantity_select++;
            }
        }
        else { //Restar
            if ((product.quantity_select - 1) !== 0) {
                product.quantity_select--;
            }
        }
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SalesSearchProductModalComponent.prototype, "productInfo", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", SalesSearchProductPage)
    ], SalesSearchProductModalComponent.prototype, "saleSearchPage", void 0);
    SalesSearchProductModalComponent = tslib_1.__decorate([
        Component({
            selector: 'app-sales-search-product-modal',
            templateUrl: './sales-search-product-modal.component.html',
            styleUrls: ['./sales-search-product-modal.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [SalesService])
    ], SalesSearchProductModalComponent);
    return SalesSearchProductModalComponent;
}());
export { SalesSearchProductModalComponent };
//# sourceMappingURL=sales-search-product-modal.component.js.map