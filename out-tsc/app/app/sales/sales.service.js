import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { HTTP_URL } from '../models/httpStatus';
import { SaleFormModel } from '../models/saleForm.model';
var SalesService = /** @class */ (function () {
    function SalesService(http, http2) {
        this.http = http;
        this.http2 = http2;
        this.saleList = [];
        this.saleFormModel = new SaleFormModel();
    }
    //Retorna la lista de ventas
    SalesService.prototype.getSales = function () {
        return this.http.get(HTTP_URL + '/sale');
    };
    SalesService.prototype.loadSales = function () {
        var _this = this;
        if (!this.saleList[0]) {
            this.getSales().subscribe(function (res) {
                _this.saleList = res;
            }, function (error) { });
        }
    };
    SalesService.prototype.getInfoSales = function () {
        return this.saleList;
    };
    SalesService.prototype.setClientInfo = function (client) {
        this.saleFormModel.id_user = client.id_user;
        this.saleFormModel.document_user = client.document_user;
        this.saleFormModel.first_name = client.first_name;
        this.saleFormModel.last_name = client.last_name;
    };
    SalesService.prototype.setProductInfo = function (platform) {
        this.saleFormModel.id_platform = platform.id_platform;
        this.saleFormModel.name_platform = platform.name_platform;
    };
    SalesService.prototype.setPriceProductInfo = function (productPrice) {
        this.saleFormModel.priceProduct = productPrice;
    };
    SalesService.prototype.cleanSaleForm = function () {
        this.saleFormModel = new SaleFormModel();
    };
    //Obtener los productos con cantidad disponible
    SalesService.prototype.getAvailabilityProduct = function () {
        return this.http.get(HTTP_URL + '/report/product');
    };
    //Obtener las cantidades con las fotos de los productos
    SalesService.prototype.getProductPrices = function (id_product) {
        return this.http.post(HTTP_URL + '/report/product_price', { id_product: id_product });
    };
    SalesService.prototype.getSaleFormModel = function () {
        return this.saleFormModel;
    };
    //Realizar venta
    SalesService.prototype.makeSale = function (sale) {
        return this.http.post(HTTP_URL + '/sale', sale);
    };
    //Agregar prodcutos a la venta
    SalesService.prototype.addProductsToSale = function (infoSale, id_sale) {
        console.log(infoSale);
        return this.http.post(HTTP_URL + '/sale_product', {
            id_sale: id_sale,
            id_product: infoSale.id_product,
            id_product_price: infoSale.id_product_price,
            quantity: infoSale.quantity_select,
            sale_price: infoSale.price_product
        });
    };
    //Descontar los productos comprados en el inventario
    SalesService.prototype.updateProductPriceList = function (id_product_price, quantity) {
        return this.http.put(HTTP_URL + '/product_price', { id_product_price: id_product_price, quantity: quantity });
    };
    SalesService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            HTTP])
    ], SalesService);
    return SalesService;
}());
export { SalesService };
//# sourceMappingURL=sales.service.js.map