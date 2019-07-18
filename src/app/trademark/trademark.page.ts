import {Component, OnInit} from '@angular/core';
import {TrademarkModel} from '../models/Trademark.model';
import {TrademarkService} from './trademark.service';

@Component({
    selector: 'app-trademark',
    templateUrl: './trademark.page.html',
    styleUrls: ['./trademark.page.scss']
})
export class TrademarkPage implements OnInit {

    public dataTrademark: TrademarkModel[] = [];

    constructor(private trademarkService: TrademarkService) {
        this.loadTrademark();
    }

    ngOnInit() {
    }

    public loadTrademark(): void {
        this.dataTrademark = this.trademarkService.getTrademarks();
    }
}
