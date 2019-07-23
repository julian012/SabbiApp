import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP_URL } from '../models/httpStatus';
var SalesService = /** @class */ (function () {
    function SalesService(http) {
        this.http = http;
        this.saleList = [];
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
    SalesService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], SalesService);
    return SalesService;
}());
export { SalesService };
//# sourceMappingURL=sales.service.js.map