import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProviderServicesPage } from './provider-services.page';

const routes: Routes = [
  {
    path: '',
    component: ProviderServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProviderServicesPageRoutingModule {}
