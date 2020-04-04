import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserAccountPageRoutingModule } from './user-account-routing.module';

import { UserAccountPage } from './user-account.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    UserAccountPageRoutingModule
  ],
  declarations: [UserAccountPage]
})
export class UserAccountPageModule {}
