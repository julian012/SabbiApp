import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ProductModel} from '../../models/Product.model';
import {TrademarkModel} from '../../models/Trademark.model';
import {TrademarkService} from '../../trademark/trademark.service';
import {GarmentModel} from '../../models/Garment.model';
import {GarmentService} from '../../garment/garment.service';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.page.html',
    styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

    public trademark: TrademarkModel;
    public garment: GarmentModel;
    @Input() product: ProductModel;

    constructor(private modalCtrl: ModalController, private trademarkService: TrademarkService,
                private garmentService: GarmentService) {
        this.trademark = new TrademarkModel();
        this.garment = new GarmentModel();
    }

    ngOnInit() {
        this.getTrademark();
        this.getGarment();
    }

    private getTrademark() {
        const list = this.trademarkService.getTrademarks();
        let i = 0;
        while (this.trademark !== null || (i + 1) === list.length) {
            if (list[i].id_trademark === this.product.id_trademark) {
                this.trademark = list[i];
                break;
            }
            i++;
        }
    }

    private getGarment() {
        const list = this.garmentService.getGarmentList();
        let j = 0;
        while (this.garment !== null || (j + 1) === list.length) {
            if (list[j].id_garment === this.product.id_garment) {
                this.garment = list[j];
                break;
            }
            j++;
        }
    }

    exit() {
        this.modalCtrl.dismiss();
    }
}
