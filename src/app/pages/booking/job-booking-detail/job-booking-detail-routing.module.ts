import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobBookingDetailPage } from './job-booking-detail.page';

const routes: Routes = [
  {
    path: '',
    component: JobBookingDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobBookingDetailPageRoutingModule {}
