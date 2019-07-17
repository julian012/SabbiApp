import {Component, OnInit} from '@angular/core';
import {GarmentModel} from '../models/Garment.model';
import {GarmentService} from './garment.service';

@Component({
    selector: 'app-garment',
    templateUrl: './garment.page.html',
    styleUrls: ['./garment.page.scss']
})
export class GarmentPage implements OnInit {

    public dataGarment: GarmentModel[] = [];

    constructor(private garmentService: GarmentService) {
        this.loadGarment();
    }

    ngOnInit() {
    }

    public loadGarment(): void {
        this.dataGarment = this.garmentService.getGarmentList();
    }
}
