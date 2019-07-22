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

@NgModule({
  declarations: [AppComponent, ReportPage],
  entryComponents: [ReportPage],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClient,
    PhotoViewer,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
