import {Component, OnInit} from '@angular/core';
import {ActionSheetController, AlertController, ToastController} from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
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
            this.showMessage(this.MESSAGE_TRADEMARK_EXIST);
        } else {
           /* this.trademarkService.createTrademark(trademark).subscribe( res => {
                console.log(res);
                this.loadTrademark();
                this.showMessage(this.MESSAGE_TRADEMARK_ADDED);
            }, (error) => {
                this.showMessage(this.MESSAGE_TRADEMARK_CONN);
            });*/
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

    // async changeNamePlatform(platform : PlatformModel) {
    //     let prompt = await this.alertCtrl.create({
    //         header: 'Modificar Plataforma',
    //         message: "Ingrese el nombre de la plataforma. Tenga en cuenta que si el nombre cambia, se va a ver reflejado tambien en los reportes",
    //         inputs: [
    //             {
    //                 name: 'title',
    //                 placeholder: 'Nombre'
    //             },
    //         ],
    //         buttons: [
    //             {
    //                 text: 'Cancelar',
    //                 handler: data => {
    //                     console.log('Cancel clicked');
    //                 }
    //             },
    //             {
    //                 text: 'Modificar',
    //                 handler: data => {
    //                     platform.name_platform = data.title;
    //                     this.dataPlatformService.updatePlatform(platform).subscribe( (res) => {
    //                         this.savePlatformLoading();
    //                         this.showMessage('Mensaje','Modificar plataforma','Nombre de la plataforma modificada correctamente');
    //                     }, (error) => {
    //                         this.savePlatformLoading();
    //                         this.showMessage('Mensaje','Modificar plataforma','Nombre de la plataforma no se pudo modificar. Verifique que no se repite con ya alguno guardado');
    //                     });
    //                 }
    //             }
    //         ]
    //     });
    //     await prompt.present();
    // }
    //
    async showMessage(messageDialog) {
        const alert = await this.alertCtrl.create({
            header: 'Mensaje',
            subHeader: 'Agregando plataforma',
            message: messageDialog,
            buttons: ['OK']
        });
        await alert.present();
    }

    // public changeStatusPlatform(platform : PlatformModel){
    //     console.log("Cambio " + platform.name_platform + " con estado " + platform.status_platform);
    //     this.dataPlatformService.updatePlatform(platform).subscribe( res =>{
    //         console.log(res);
    //     });
    // }
    //
    // public generatePath(name : string){
    //     //return this.dataPlatformService.validateUrlImagePlatform(name);
    //     return "https://logo.clearbit.com/" + name + ".com";
    //     /*https://ui-avatars.com/api/?name=MercadoLibre Api para en caso de no encontrar la imagen*/
    // }
    //
    // public generatePathAlternative(name : string){
    //     console.log("https://ui-avatars.com/api/?name=" + name);
    //     return "https://ui-avatars.com/api/?name=" + name ;
    // }
    //
    // async deletePlatform(platform : PlatformModel){
    //     const alert = await this.alertCtrl.create({
    //         header: 'Confirmación',
    //         message: `¿Seguro desea eliminar la plataforma ${platform.name_platform}?`,
    //         cssClass: 'options-as-platforms',
    //         buttons: [
    //             {
    //                 text: 'Cancelar',
    //                 role: 'cancel',
    //
    //             }, {
    //                 text: 'Continuar',
    //                 handler: () => {
    //                     this.dataPlatformService.deletePlatform(platform).subscribe( res =>{
    //                         this.showMessage('Mensaje','Eliminando plataforma', 'Plataforma eliminada correctamente');
    //                         this.savePlatformLoading();
    //                         this.loadPlatforms();
    //                     }, (error) => {
    //                         this.showMessage('Error', 'Eliminando plataforma','No se puede eliminar la plataforma, debido a que ya fue asignada a una venta. En tal caso de no usarla más, la puede desactivar')
    //                     });;
    //                 }
    //             }
    //         ]
    //     });
    //
    //     await alert.present();
    //
    // }
}
