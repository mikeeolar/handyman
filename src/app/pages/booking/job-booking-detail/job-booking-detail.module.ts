import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobBookingDetailPageRoutingModule } from './job-booking-detail-routing.module';

import { JobBookingDetailPage } from './job-booking-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobBookingDetailPageRoutingModule
  ],
  declarations: [JobBookingDetailPage]
})
export class JobBookingDetailPageModule {}
