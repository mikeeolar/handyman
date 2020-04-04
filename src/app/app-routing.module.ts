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
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/booking/booking.module').then( m => m.BookingPageModule)
      },
      {
        path: 'job-details/:provider-id',
        loadChildren: () => import('./pages/booking/job-booking-detail/job-booking-detail.module').then( m => m.JobBookingDetailPageModule)
      }
    ]
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
        path: 'provider-services/:category-id',
        loadChildren:
          './pages/user-dashboard/provider-services/provider-services.module#ProviderServicesPageModule'
      },
      {
        path: 'provider-list/:service-id',
        loadChildren:
          './pages/user-dashboard/provider-list/provider-list.module#ProviderListPageModule'
      },
      {
        path: 'provider-profile/:user-id/:service',
        loadChildren:
          './pages/user-dashboard/provider-profile/provider-profile.module#ProviderProfilePageModule'
      }
    ]
  },
  {
    path: 'notification',
    loadChildren: () => import('./pages/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'user-account',
    loadChildren: () => import('./pages/user-account/user-account.module').then( m => m.UserAccountPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
