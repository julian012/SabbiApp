import {Component, OnInit} from '@angular/core';
import {ClientService} from '../client/client.service';
import {TrademarkService} from '../trademark/trademark.service';
import {GarmentService} from '../garment/garment.service';
import {SalesService} from '../sales/sales.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    constructor(private clientService: ClientService,
                private trademarkService: TrademarkService,
                private  garmentService: GarmentService,
                private salesService: SalesService) {

    }

    ngOnInit(): void {
        this.clientService.loadClients();
        this.trademarkService.loadTrademarks();
        this.garmentService.loadGarments();
        this.salesService.loadSales();
    }


}
