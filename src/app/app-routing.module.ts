import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: './pages/auth/login/login.module#LoginPageModule'
  },
  {
    path: 'register',
    loadChildren: './pages/auth/register/register.module#RegisterPageModule'
  },
  {
    path: 'booking',
    loadChildren: () => import('./pages/booking/booking.module').then( m => m.BookingPageModule)
  },
  {
    path: 'user-dashboard',
    children: [
      {
        path: '',
        loadChildren:
          './pages/user-dashboard/user-dashboard.module#UserDashboardPageModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'user-services/:category-id',
        loadChildren:
          './pages/user-dashboard/user-services/user-services.module#UserServicesPageModule'
      },
      {
        path: 'user-list/:service-id',
        loadChildren:
          './pages/user-dashboard/user-list/user-list.module#UserListPageModule'
      },
      {
        path: 'user-profile/:user-id/:service',
        loadChildren:
          './pages/user-dashboard/user-profile/user-profile.module#UserProfilePageModule'
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
