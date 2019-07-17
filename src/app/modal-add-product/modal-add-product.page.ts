import {Component, OnInit} from '@angular/core';
import {ModalController, PickerController} from '@ionic/angular';
import {ProductModel} from '../models/Product.model';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {PickerOptions} from '@ionic/core';
import {TrademarkModel} from '../models/Trademark.model';
import {TrademarkService} from '../trademark/trademark.service';
import {PickerModel} from '../models/Picker.model';

@Component({
    selector: 'app-modal-add-product',
    templateUrl: './modal-add-product.page.html',
    styleUrls: ['./modal-add-product.page.scss'],
})
export class ModalAddProductPage implements OnInit {

    public dataProduct: ProductModel;
    public productForm: FormGroup;
    public trademarkPickerList: Array<{ text, value }>;
    public trademark: string;

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
                public pickerCtrl: PickerController, public trademarkService: TrademarkService) {
        this.dataProduct = new ProductModel();
        this.trademarkPickerList = new Array<{ text, value }>();
        this.loadTrademarks();
        this.trademark = 'Seleccione una opción';
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
        const genders: PickerOptions = {
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Done'
                }
            ], columns: [
                {
                    name: 'Trademark',
                    options: this.trademarkPickerList
                }
            ]
        };
        const picker = await this.pickerCtrl.create(genders);
        picker.present();
        picker.onDidDismiss().then(async () => {
            const col = await picker.getColumn('Trademark');
            console.log('col: ', col);
            this.trademark = col.options[col.selectedIndex].text;
        });
    }
}
