import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ProductModel} from '../models/Product.model';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-modal-add-product',
    templateUrl: './modal-add-product.page.html',
    styleUrls: ['./modal-add-product.page.scss'],
})
export class ModalAddProductPage implements OnInit {

    public dataProduct: ProductModel;
    public productForm: FormGroup;

    public errorMessages = {
        name: [
            {type: 'required', message: 'El nombre es necesario'},
            {type: 'maxLength', message: 'El numero de caracteres permitidos es hasta 10'}
        ], size: [
            {type: 'required', message: 'La cantidad es necesaria'},
            {type: 'maxLength', message: 'El numero de caracteres permitidos es hasta 10'}
        ], price: [
            {type: 'required', message: 'El precio es necesario'},
            {type: 'maxLength', message: 'El numero de caracteres permitidos es hasta 10'}
        ], salePrice: [
            {type: 'required', message: 'El precio de venta es necesario'},
            {type: 'maxLength', message: 'El numero de caracteres permitidos es hasta 10'}
        ]
    };


    constructor(private modalCtrl: ModalController, public formBuilder: FormBuilder) {
        this.dataProduct = new ProductModel();
        const validatorNumField = Validators.compose([
            Validators.required,
            Validators.maxLength(10)
        ]);
        this.productForm = this.formBuilder.group({
            name: new FormControl('', Validators.compose([
                Validators.required,
                Validators.maxLength(30)
            ])),
            size: new FormControl('', validatorNumField),
            price: new FormControl('', validatorNumField),
            salePrice: new FormControl('', validatorNumField)
        });
    }

    ngOnInit() {
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
}
