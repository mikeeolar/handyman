import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProviderServicesPageRoutingModule } from './provider-services-routing.module';

import { ProviderServicesPage } from './provider-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProviderServicesPageRoutingModule
  ],
  declarations: [ProviderServicesPage]
})
export class ProviderServicesPageModule {}
