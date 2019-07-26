import { NgModule } from '@angular/core';
import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {IonicGestureConfig} from './ionicgestureconfig/ionic-gesture-config.service';
import { ReactiveFormsModule} from '@angular/forms';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';
import {Camera} from '@ionic-native/camera/ngx';
import {ReportPage} from './report/report.page';
import {ModalSaleDetailComponent} from './sales/modal-sale-detail/modal-sale-detail.component';
import { HTTP } from '@ionic-native/http/ngx';
import {ProgressBarComponent, ProgressBarModule} from 'angular-progress-bar';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Screenshot } from '@ionic-native/screenshot/ngx';

@NgModule({
  declarations: [AppComponent, ReportPage, ModalSaleDetailComponent],
  entryComponents: [ReportPage, ModalSaleDetailComponent, ProgressBarComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ProgressBarModule,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClient,
    HTTP,
    PhotoViewer,
    Camera,
    ScreenOrientation,
    Screenshot,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
