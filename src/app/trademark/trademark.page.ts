import {Component, OnInit} from '@angular/core';
import {ActionSheetController, AlertController, ToastController} from '@ionic/angular';
import {LoadingController} from '@ionic/angular';
import {TrademarkModel} from '../models/Trademark.model';
import {TrademarkService} from './trademark.service';

@Component({
    selector: 'app-trademark',
    templateUrl: './trademark.page.html',
    styleUrls: ['./trademark.page.scss']
})
export class TrademarkPage implements OnInit {

    public MESSAGE_TRADEMARK_EXIST = 'La marca no se pudo agregar, debido a que el nombre ingresado ya existe.';
    public MESSAGE_TRADEMARK_CONN = 'La marca no se pudo agregar por un problema de conexión.';
    public MESSAGE_TRADEMARK_ADDED = 'Marca agregada correctamente';
    public dataTrademark: TrademarkModel[] = [];

    constructor(private trademarkService: TrademarkService,
                public alertCtrl: AlertController,
                public loadingController: LoadingController,
                private actionSheetCtrl: ActionSheetController) {
    }

    ngOnInit() {
        this.loadTrademark();
    }

    public loadTrademark(): void {
        this.dataTrademark = this.trademarkService.getTrademarks();
    }

    public createTrademark(data: string): void {
        const trademark = new TrademarkModel();
        trademark.name_trademark = data;
        trademark.id_trademark = -1;
        if (this.dataTrademark.find(x => x.name_trademark.toUpperCase() === data.toUpperCase())) {
            this.showMessage('Mensaje', 'Agregando marca', this.MESSAGE_TRADEMARK_EXIST);
        } else {
            this.trademarkService.createTrademark(trademark).subscribe(res => {
                console.log(res);
                this.loadTrademark();
                this.showMessage('Mensaje', 'Agregando marca', this.MESSAGE_TRADEMARK_ADDED);
            }, (error) => {
                this.showMessage('Mensaje', 'Agregando marca', this.MESSAGE_TRADEMARK_CONN);
            });
        }
    }

    async saveTrademarkLoading() {
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
                        this.createTrademark(data.title);
                        this.saveTrademarkLoading();

                    }
                }
            ]
        });
        await prompt.present();
    }

    async changeTrademarkName(trademark: TrademarkModel) {
        const prompt = await this.alertCtrl.create({
            header: 'Modificar Marca',
            message: 'Ingrese el nombre de la plataforma. Tenga en cuenta que si el nombre cambia,' +
                ' se va a ver reflejado tambien en los reportes',
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
                    text: 'Modificar',
                    handler: data => {
                        trademark.name_trademark = data.title;
                        this.trademarkService.updateTrademark(trademark).subscribe((res) => {
                            this.saveTrademarkLoading();
                            this.showMessage('Mensaje', 'Modificar marca', 'Nombre de la marca modificada correctamente');
                        }, (error) => {
                            this.saveTrademarkLoading();
                            this.showMessage('Mensaje', 'Modificar marca', 'Nombre de la marca ' +
                                'no se pudo modificar. Verifique que no se repite con ya alguno guardado.');
                        });
                    }
                }
            ]
        });
        await prompt.present();
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
    async deletePlatform(trademark: TrademarkModel) {
        const alert = await this.alertCtrl.create({
            header: 'Confirmación',
            message: `¿Seguro desea eliminar la marca ${trademark.name_trademark}?`,
            cssClass: 'options-as-platforms',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',

                }, {
                    text: 'Continuar',
                    handler: () => {
                        this.trademarkService.deleteTrademark(trademark).subscribe(res => {
                            this.showMessage('Mensaje', 'Eliminando marca', 'Marca eliminada correctamente');
                            this.saveTrademarkLoading();
                            this.loadTrademark();
                        }, (error) => {
                            this.showMessage('Error', 'Eliminando plataforma',
                                'No se puede eliminar la plataforma, debido a que ya fue asignada a una venta. ' +
                                'En tal caso de no usarla más, la puede desactivar');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }

    async optionsInPlatforms(trademark: TrademarkModel) {
        const actionSheet = await this.actionSheetCtrl.create({
            header: trademark.name_trademark,
            buttons: [{
                text: 'Eliminar',
                icon: 'close-circle',
                cssClass: 'danger',
                handler: () => {
                    this.deletePlatform(trademark);
                }
            }, {
                text: 'Cambiar nombre',
                icon: 'build',
                handler: () => {
                    this.changeTrademarkName(trademark);
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
