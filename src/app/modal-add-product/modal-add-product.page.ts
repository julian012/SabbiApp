import {Component, OnInit} from '@angular/core';
import {
    ModalController,
    PickerController,
    AlertController,
    ToastController,
    ActionSheetController,
    LoadingController
} from '@ionic/angular';
import {ProductModel} from '../models/Product.model';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {PickerOptions} from '@ionic/core';
import {TrademarkModel} from '../models/Trademark.model';
import {TrademarkService} from '../trademark/trademark.service';
import {GarmentService} from '../garment/garment.service';
import {GarmentModel} from '../models/Garment.model';
import {ERRORMESSAGES_PRODUCT} from '../models/httpStatus';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';
import {ModalAddProductService} from './modal-add-product.service';

@Component({
    selector: 'app-modal-add-product',
    templateUrl: './modal-add-product.page.html',
    styleUrls: ['./modal-add-product.page.scss'],
})
export class ModalAddProductPage implements OnInit {

    public MESSAGE_CANCEL_ADD = '¿Seguro desea cancelar?';
    public MESSAGE_CONFIRM_ADD = '¿Seguro desea agregar el producto?';
    public dataProduct: ProductModel;
    public productForm: FormGroup;
    public trademarkPickerList: Array<{ text, value }>;
    public garmentPickerList: Array<{ text, value }>;
    public trademark: TrademarkModel;
    public garment: GarmentModel;
    public errorMessages = ERRORMESSAGES_PRODUCT;
    public gender = '';
    public pickerTradeActive = false;
    private imagesCount = 0;
    private imagesAmount = 4;
    public map = new Map();

    constructor(private modalCtrl: ModalController, public formBuilder: FormBuilder,
                public pickerCtrl: PickerController, public trademarkService: TrademarkService,
                public garmentservice: GarmentService, private alertCtrl: AlertController,
                private camera: Camera, private actionSheetCtrl: ActionSheetController,
                public toastCtrl: ToastController,
                private photoViewer: PhotoViewer, private addProductService: ModalAddProductService,
                private loadingCtrl: LoadingController) {
        this.dataProduct = new ProductModel();
        this.dataProduct.gender_product = 'M';
        this.dataProduct.utility_product = 0;
        this.createProductForm();
        this.trademark = new TrademarkModel();
        this.garment = new GarmentModel();
        this.trademarkPickerList = new Array<{ text, value }>();
        this.garmentPickerList = new Array<{ text, value }>();
        this.loadTrademarks();
        this.loadGarments();
    }

    ngOnInit() {
    }

    public createProductForm() {
        const validatorNumField = Validators.compose([
            Validators.required,
            Validators.min(50),
            Validators.max(9999999999)
        ]);
        this.productForm = this.formBuilder.group({
            name: new FormControl('', Validators.compose([
                Validators.required,
                Validators.maxLength(20)
            ])), quantity: new FormControl('', Validators.compose([
                Validators.required,
                Validators.min(1),
                Validators.max(99999)
            ]))
            , price: new FormControl('', validatorNumField)
            , gender: new FormControl(this.dataProduct.gender_product, Validators.required)
            , size: new FormControl('', Validators.compose([
                Validators.required,
                Validators.maxLength(10)
            ]))
            , utility: new FormControl()
        });
    }

    async loadTrademarks() {
        this.trademarkService.getTrademarks().forEach(trademark => {
            this.trademarkPickerList.push({text: trademark.name_trademark, value: trademark.id_trademark});
        });
        if (this.trademarkPickerList.length > 0) {
            this.trademark.name_trademark = this.trademarkPickerList[0].text;
            this.trademark.id_trademark = this.trademarkPickerList[0].value;
            this.dataProduct.id_trademark = this.trademarkPickerList[0].value;
        } else {
            this.trademark.name_trademark = 'Opción';
            this.trademark.id_trademark = 0;
        }
    }

    private loadGarments() {
        this.garmentservice.getGarmentList().forEach(garment => {
            this.garmentPickerList.push({text: garment.name_garment, value: garment.id_garment});
        });
        if (this.garmentPickerList.length > 0) {
            this.garment.name_garment = this.garmentPickerList[0].text;
            this.garment.id_garment = this.garmentPickerList[0].value;
            this.dataProduct.id_garment = this.garmentPickerList[0].value;
        } else {
            this.garment.name_garment = 'Opción';
            this.garment.id_garment = 0;
        }
    }

    async accept(message: string) {
        const alert = await this.alertCtrl.create({
            header: 'Confirmación',
            message,
            cssClass: 'options-as-products',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                }, {
                    text: 'Continuar',
                    handler: async () => {
                        this.sendProduct();
                    }
                }
            ]
        });
        await alert.present();
    }

    sendProduct() {
        this.dataProduct.name_product = this.productForm.value.name;
        this.dataProduct.price_product = this.productForm.value.price;
        this.dataProduct.status_product = 'A';
        this.dataProduct.gender_product = this.productForm.value.gender;
        this.dataProduct.quantity = this.productForm.value.quantity;
        this.dataProduct.date = new Date();
        console.log(this.dataProduct);
        this.addProductService.createProduct(this.dataProduct).subscribe(res => {
            console.log(res);
            this.saveProductkLoading();
            this.showMessage('Mensaje', 'Agregando producto', 'Producto agregado correctamente');
        }, (error) => {
            this.showMessage('Mensaje', 'Modificar producto',
                'El producto no se pudo agregar. Existe un problema en la conexión.');
        });
        this.modalCtrl.dismiss({
            value: true
        });
    }

    async saveProductkLoading() {
        const loading = await this.loadingCtrl.create({
            message: 'Procesando',
            duration: 2000
        });
        await loading.present();
    }

    async showMessage(messageHeader, messageSubHeader, messageDialog) {
        const alert = await this.alertCtrl.create({
            header: messageHeader,
            subHeader: messageSubHeader,
            message: messageDialog,
            buttons: ['OK']
        });
        await alert.present();
    }

    async cancel(message: string) {
        const alert = await this.alertCtrl.create({
            header: 'Confirmación',
            message,
            cssClass: 'options-as-products',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                }, {
                    text: 'Continuar',
                    handler: async () => {
                        this.modalCtrl.dismiss({
                            value: false
                        });
                    }
                }
            ]
        });
        await alert.present();
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
                        this.dataProduct.id_trademark = value.Trademark.value;
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
                        this.dataProduct.id_garment = value.Garment.value;
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
        const onDismiss = await picker.onDidDismiss().then(() => {
            this.pickerTradeActive = false;
        });
    }

    async presentPhotoOptions() {
        if (this.imagesCount < 4) {
            const actionSheet = await this.actionSheetCtrl.create({
                header: 'Opciones',
                buttons: [{
                    text: 'Tomar foto',
                    icon: 'camera',
                    cssClass: 'danger',
                    handler: () => {
                        this.takePicture();
                    }
                }, {
                    text: 'Subir foto',
                    icon: 'photos',
                    handler: () => {
                        this.getImages();
                    }
                }, {
                    text: 'Cancelar',
                    role: 'cancel'
                }
                ]
            });
            await actionSheet.present();
        } else {
            this.showMaxPhotoToast().then();
        }
    }

    takePicture() {
        const options: CameraOptions = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            allowEdit: false
        };
        this.camera.getPicture(options)
            .then(imageData => {
                this.map.set(this.imagesCount++, 'data:image/jpeg;base64,' + imageData);
            })
            .catch(error => {
                prompt(error);
            });
    }

    getImages() {
        const options: CameraOptions = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            allowEdit: false,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };
        this.camera.getPicture(options)
            .then(imageData => {
                this.map.set(this.imagesCount++, 'data:image/jpeg;base64,' + imageData);
            })
            .catch(error => {
                prompt(error);
            });
    }

    async showMaxPhotoToast() {
        const toast = await this.toastCtrl.create({
            message: 'Puedes subir máximo 4 fotos',
            duration: 2000
        });
        toast.present();
    }

    zoomPhoto(photo) {
        this.photoViewer.show(photo);
    }

    async showDeleteAlert(photoKey) {
        const alert = await this.alertCtrl.create({
            header: 'Borrar foto',
            message: '¿Esta seguro de eliminar la foto?',
            buttons: [
                {
                    text: 'Elminar',
                    handler: () => {
                        this.map.delete(photoKey);
                        this.imagesCount--;
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel'
                }
            ]
        });
        await alert.present();
    }
}
