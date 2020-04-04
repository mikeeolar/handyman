import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDashboardPage } from './user-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: UserDashboardPage
  },
  {
    path: 'provider-profile',
    loadChildren: () => import('./provider-profile/provider-profile.module').then( m => m.ProviderProfilePageModule)
  },
  {
    path: 'provider-list',
    loadChildren: () => import('./provider-list/provider-list.module').then( m => m.ProviderListPageModule)
  },
  {
    path: 'provider-services',
    loadChildren: () => import('./provider-services/provider-services.module').then( m => m.ProviderServicesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDashboardPageRoutingModule {}
