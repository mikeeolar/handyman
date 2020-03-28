import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MapModalComponent } from './map-modal/map-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MapModalComponent
  ],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  exports: [MapModalComponent],
  entryComponents: [MapModalComponent]
})
export class SharedModule {}
