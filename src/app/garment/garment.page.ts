import {Component, OnInit} from '@angular/core';
import {GarmentModel} from '../models/Garment.model';
import {GarmentService} from './garment.service';
import {ActionSheetController, AlertController, LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-garment',
    templateUrl: './garment.page.html',
    styleUrls: ['./garment.page.scss']
})
export class GarmentPage implements OnInit {

    public MESSAGE_GARMENT_EXIST = 'La prenda no se pudo agregar, debido a que el nombre ingresado ya existe.';
    public MESSAGE_GARMENT_CONN = 'La prenda no se pudo agregar por un problema de conexión.';
    public MESSAGE_GARMENT_ADDED = 'Prenda agregada correctamente';
    public dataGarment: GarmentModel[] = [];

    constructor(private garmentService: GarmentService,
                public alertCtrl: AlertController,
                public loadingController: LoadingController,
                private actionSheetCtrl: ActionSheetController) {
    }

    ngOnInit() {
        this.loadGarment();
    }

    public loadGarment(): void {
        this.dataGarment = this.garmentService.getGarmentList();
    }
}
