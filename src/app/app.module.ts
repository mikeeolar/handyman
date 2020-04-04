import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { CreateBookingComponent } from './pages/booking/create-booking/create-booking.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { JobReviewComponent } from './pages/booking/job-review/job-review.component';
import { EditBookingComponent } from './pages/booking/edit-booking/edit-booking.component';

@NgModule({
  declarations: [AppComponent, CreateBookingComponent, JobReviewComponent, EditBookingComponent],
  entryComponents: [CreateBookingComponent, JobReviewComponent, EditBookingComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot({ hardwareBackButton: false }),
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    Camera,
    StatusBar,
    SplashScreen,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NativeStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
