import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ImagePickerComponent } from './pickers/image-picker/image-picker.component';
import { MapModalComponent } from './map-modal/map-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ImagePickerComponent,
    MapModalComponent
  ],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  exports: [ImagePickerComponent, MapModalComponent],
  entryComponents: [MapModalComponent]
})
export class SharedModule {}