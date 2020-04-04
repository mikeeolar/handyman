import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingPage } from './booking.page';

const routes: Routes = [
  {
    path: '',
    component: BookingPage
  },
  {
    path: 'job-booking-detail',
    loadChildren: () => import('./job-booking-detail/job-booking-detail.module').then( m => m.JobBookingDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingPageRoutingModule {}
