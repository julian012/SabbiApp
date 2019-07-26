import {Component, OnInit} from '@angular/core';
import {ClientService} from '../client/client.service';
import {TrademarkService} from '../trademark/trademark.service';
import {GarmentService} from '../garment/garment.service';
import {SalesService} from '../sales/sales.service';
import { PlatformsService } from '../platforms/platforms.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    constructor(private clientService: ClientService,
                private trademarkService: TrademarkService,
                private  garmentService: GarmentService,
                private salesService: SalesService,
                private platfomService: PlatformsService) {

    }

    ngOnInit(): void {
        this.clientService.loadClients();
        this.trademarkService.loadTrademarks();
        this.garmentService.loadGarments();
        this.salesService.loadSales();
        this.platfomService.loadPlatforms();
    }


}
