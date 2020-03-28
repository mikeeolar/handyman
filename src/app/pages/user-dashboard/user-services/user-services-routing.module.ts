import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserServicesPage } from './user-services.page';

const routes: Routes = [
  {
    path: '',
    component: UserServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserServicesPageRoutingModule {}
