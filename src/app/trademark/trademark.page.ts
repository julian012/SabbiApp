import {Component, OnInit} from '@angular/core';
import {TrademarkModel} from '../models/Trademark.model';
import {TrademarkService} from './trademark.service';

@Component({
    selector: 'app-trademark',
    templateUrl: './trademark.page.html',
    styleUrls: ['./trademark.page.scss'],
    providers: [TrademarkService]
})
export class TrademarkPage implements OnInit {

    public dataTrademark: Array<TrademarkModel>;

    constructor(private trademarkService: TrademarkService) {
        this.dataTrademark = new Array<TrademarkModel>();
    }

    ngOnInit() {
        this.loadTrademark();
    }

    public loadTrademark(): void {
        // if (this.dataTrademark.length < 0) {
            this.trademarkService.getTrademarks().subscribe(res => {
                    this.dataTrademark = res;
                    console.log(this.dataTrademark);
                },
                (error: any) => {
                    console.log('Error al obtener las marcas');
                    this.dataTrademark = new Array<TrademarkModel>();
                }
            );
        // }
    }
}
