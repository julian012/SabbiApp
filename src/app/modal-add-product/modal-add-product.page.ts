import {Component, OnInit} from '@angular/core';
import {ModalController, PickerController} from '@ionic/angular';
import {ProductModel} from '../models/Product.model';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {PickerOptions} from '@ionic/core';
import {TrademarkModel} from '../models/Trademark.model';
import {TrademarkService} from '../trademark/trademark.service';
import {PickerModel} from '../models/Picker.model';
import {GarmentService} from '../garment/garment.service';
import {GarmentModel} from '../models/Garment.model';

@Component({
    selector: 'app-modal-add-product',
    templateUrl: './modal-add-product.page.html',
    styleUrls: ['./modal-add-product.page.scss'],
})
export class ModalAddProductPage implements OnInit {

    public dataProduct: ProductModel;
    public productForm: FormGroup;
    public trademarkPickerList: Array<{ text, value }>;
    public garmentPickerList: Array<{ text, value }>;
    public trademark: TrademarkModel;
    public garment: GarmentModel;
    public pickerTradeActive = false;

    public errorMessages = {
        name: [
            {type: 'required', message: 'El nombre es obligatorio'},
            {type: 'maxLength', message: 'El numero de caracteres permitidos es hasta 10'}
        ], size: [
            {type: 'required', message: 'La cantidad es obligatoria'},
            {type: 'maxLength', message: 'El numero de caracteres permitidos es hasta 10'}
        ], price: [
            {type: 'required', message: 'El precio es obligatorio'},
            {type: 'maxLength', message: 'El numero de caracteres permitidos es hasta 10'}
        ], salePrice: [
            {type: 'required', message: 'El precio de venta es obligatorio'},
            {type: 'maxLength', message: 'El numero de caracteres permitidos es hasta 10'}
        ]
    };

    private validatorNumField = Validators.compose([
        Validators.required,
        Validators.maxLength(10)
    ]);

    constructor(private modalCtrl: ModalController, public formBuilder: FormBuilder,
                public pickerCtrl: PickerController, public trademarkService: TrademarkService,
                public garmentservice: GarmentService) {
        this.dataProduct = new ProductModel();
        this.trademarkPickerList = new Array<{ text, value }>();
        this.garmentPickerList = new Array<{ text, value }>();
        this.loadTrademarks();
        this.loadGarments();
        this.trademark = new TrademarkModel();
        this.trademark.name_trademark = 'Opción';
        this.garment = new GarmentModel();
        this.garment.name_garment = 'Opción';
        this.trademark.id_trademark = 0;
        this.productForm = this.formBuilder.group({
            name: new FormControl('', Validators.compose([
                Validators.required,
                Validators.maxLength(30)
            ])), size: new FormControl('', this.validatorNumField)
            , price: new FormControl('', this.validatorNumField)
            , salePrice: new FormControl('', this.validatorNumField)
        });
    }

    ngOnInit() {
    }

    async loadTrademarks() {
        this.trademarkService.getTrademarks().forEach(trademark => {
            this.trademarkPickerList.push({text: trademark.name_trademark, value: (trademark.id_trademark + '')});
        });
    }

    private loadGarments() {
        this.garmentservice.getGarmentList().forEach(garment => {
            console.log('----' + garment.name_garment);
            this.garmentPickerList.push({text: garment.name_garment, value: (garment.id_garment + '')});
        });
    }

    accept() {
        this.modalCtrl.dismiss({
            value: true
        });
    }

    cancel() {
        this.modalCtrl.dismiss({
            value: false
        });
    }

    async showTrademarks() {
        const trademarks: PickerOptions = {
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Done',
                    role: 'done',
                    handler: (value: any): void => {
                        this.trademark.name_trademark = value.Trademark.text;
                        this.trademark.id_trademark = value.Trademark.value;
                    }
                }
            ], columns: [
                {
                    name: 'Trademark',
                    options: this.trademarkPickerList
                }
            ]
        };
        const picker = await this.pickerCtrl.create(trademarks);
        picker.present();
        const onDismiss = await picker.onDidDismiss();
    }

    async showGarments() {
        this.pickerTradeActive = true;
        const garments: PickerOptions = {
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Done',
                    role: 'done',
                    handler: (value: any): void => {
                        this.garment.name_garment = value.Garment.text;
                        this.garment.id_garment = value.Garment.value;
                    }
                }
            ], columns: [
                {
                    name: 'Garment',
                    options: this.garmentPickerList
                }
            ]
        };
        const picker = await this.pickerCtrl.create(garments);
        picker.present();
        const onDismiss = await picker.onDidDismiss().then( () => {
            this.pickerTradeActive = false;
        });
    }
}
