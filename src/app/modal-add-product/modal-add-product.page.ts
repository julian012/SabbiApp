import {Component, OnInit} from '@angular/core';
import {ModalController, PickerController, AlertController, ToastController, ActionSheetController} from '@ionic/angular';
import {ProductModel} from '../models/Product.model';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {PickerOptions} from '@ionic/core';
import {TrademarkModel} from '../models/Trademark.model';
import {TrademarkService} from '../trademark/trademark.service';
import {GarmentService} from '../garment/garment.service';
import {GarmentModel} from '../models/Garment.model';
import {AlertController} from '@ionic/angular';
import {ERRORMESSAGES, ERRORMESSAGES_PRODUCT} from '../models/httpStatus';

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
    private imagesAmount = 0;
    public map = new Map();


    constructor(private modalCtrl: ModalController, public formBuilder: FormBuilder,
                public pickerCtrl: PickerController, public trademarkService: TrademarkService,
                public garmentservice: GarmentService, private alertCtrl: AlertController,
                private camera: Camera, private actionSheetCtrl: ActionSheetController,
                public toastCtrl: ToastController, private imagePicker: ImagePicker, private photoViewer: PhotoViewer) {
        this.dataProduct = new ProductModel();
        this.dataProduct.gender_product = 'M';
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
            Validators.min(100),
            Validators.max(9999999999)
        ]);
        this.productForm = this.formBuilder.group({
            name: new FormControl('', Validators.compose([
                Validators.required,
                Validators.maxLength(20)
            ])), size: new FormControl('', Validators.compose([
                Validators.required,
                Validators.min(1),
                Validators.max(99999)
            ]))
            , price: new FormControl('', validatorNumField)
            , salePrice: new FormControl('', validatorNumField)
            , gender: new FormControl(this.dataProduct.gender_product, Validators.required)
        });
    }

    async loadTrademarks() {
        this.trademarkService.getTrademarks().forEach(trademark => {
            this.trademarkPickerList.push({text: trademark.name_trademark, value: (trademark.id_trademark + '')});
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
            this.garmentPickerList.push({text: garment.name_garment, value: (garment.id_garment + '')});
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

    accept() {
        this.modalCtrl.dismiss({
            value: true
        });
    }

    async cancel(message: string) {
        const alert = await this.alertCtrl.create({
            header: 'Confirmación',
            message,
            cssClass: 'options-as-platforms',
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
                this.map.set(this.imagesAmount++, 'data:image/jpeg;base64,' + imageData);
                this.imagesCount++;
            })
            .catch(error => {
                prompt(error);
            });
    }

    getImages() {
        const options: ImagePickerOptions = {
            maximumImagesCount: 4,
            quality: 50,
            outputType: 1
        };
        this.imagePicker.getPictures(options)
            .then((results) => {
                for (let i = 0; i < results.length; i++) {
                    this.map.set(this.imagesAmount++, 'data:image/jpeg;base64,' + results[i]);
                    this.imagesCount++;
                }
            }).catch((err) => {
            alert(err);
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
