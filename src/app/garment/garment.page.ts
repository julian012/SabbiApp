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

    public createGarment(data: string): void {
        const garment = new GarmentModel();
        garment.name_garment = data;
        garment.id_garment = -1;
        if (this.dataGarment.find(x => x.name_garment.toUpperCase() === data.toUpperCase())) {
            this.showMessage('Mensaje', 'Agregar prenda', this.MESSAGE_GARMENT_EXIST);
        } else {
            this.garmentService.createGarment(garment).subscribe(res => {
                console.log(res);
                this.loadGarment();
                this.showMessage('Mensaje', 'Agregar prenda', this.MESSAGE_GARMENT_ADDED);
            }, (error) => {
                this.showMessage('Mensaje', 'Agregar prenda', this.MESSAGE_GARMENT_CONN);
            });
        }
    }

    async saveGarmentLoading() {
        const loading = await this.loadingController.create({
            message: 'Procesando',
            duration: 2000
        });
        await loading.present();
    }

    async showPrompt() {
        const prompt = await this.alertCtrl.create({
            header: 'Agregar Marca',
            message: 'Ingrese el nombre de la marca que desea agregrar',
            inputs: [
                {
                    name: 'title',
                    placeholder: 'Nombre'
                },
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Guardar',
                    handler: data => {
                        this.createGarment(data.title);
                        this.saveGarmentLoading();

                    }
                }
            ]
        });
        await prompt.present();
    }

    async changeGarmentName(garment: GarmentModel) {
        const prompt = await this.alertCtrl.create({
            header: 'Modificar Marca',
            message: 'Ingrese el nombre de la prenda. Tenga en cuenta que si el nombre cambia,' +
                ' se va a ver reflejado tambien en los reportes',
            inputs: [
                {
                    name: 'title',
                    placeholder: garment.name_garment
                },
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Modificar',
                    handler: data => {
                        this.saveGarment(garment, data.title);
                    }
                }
            ]
        });
        await prompt.present();
    }

    saveGarment(garment: GarmentModel, title: string) {
        if (this.dataGarment.find(x => x.name_garment.toUpperCase() === title.toUpperCase())) {
            this.showMessage('Mensaje', 'Modificar prenda', this.MESSAGE_GARMENT_EXIST);
        } else {
            garment.name_garment = title;
            this.garmentService.updateGarment(garment).subscribe((res) => {
                this.saveGarmentLoading();
                this.showMessage('Mensaje', 'Modificar prenda', 'Nombre de la prenda modificada correctamente');
            }, (error) => {
                this.saveGarmentLoading();
                this.showMessage('Mensaje', 'Modificar prenda', 'Nombre de la prenda ' +
                    'no se pudo modificar. Error en la conexión.');
            });
        }
    }

    async showMessage(messageHeader, messageSubHeader, messageDialog) {
        const alert = await this.alertCtrl.create({
            header: 'Mensaje',
            subHeader: 'Agregando plataforma',
            message: messageDialog,
            buttons: ['OK']
        });
        await alert.present();
    }

    // public generatePathAlternative(name : string){
    //     console.log("https://ui-avatars.com/api/?name=" + name);
    //     return "https://ui-avatars.com/api/?name=" + name ;
    // }
    //
    async deleteGarment(garment: GarmentModel) {
        const alert = await this.alertCtrl.create({
            header: 'Confirmación',
            message: `¿Seguro desea eliminar la prenda ${garment.name_garment}?`,
            cssClass: 'options-as-platforms',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                }, {
                    text: 'Continuar',
                    handler: () => {
                        this.garmentService.deleteGarment(garment).subscribe(res => {
                            this.loadGarment();
                            this.showMessage('Mensaje', 'Eliminando prenda', 'Prenda eliminada correctamente');
                            this.saveGarmentLoading();
                        }, (error) => {
                            this.showMessage('Error', 'Eliminando prenda',
                                'No se puede eliminar la prenda, debido un problema en la conexión');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }

    async optionsInGarments(garment: GarmentModel) {
        const actionSheet = await this.actionSheetCtrl.create({
            header: garment.name_garment,
            buttons: [{
                text: 'Eliminar',
                icon: 'close-circle',
                cssClass: 'danger',
                handler: () => {
                    this.deleteGarment(garment);
                }
            }, {
                text: 'Cambiar nombre',
                icon: 'build',
                handler: () => {
                    this.changeGarmentName(garment);
                }
            }, {
                text: 'Cancelar',
                role: 'cancel'
            }
            ]
        });
        await actionSheet.present();
    }
}
