import {
  Component,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit {
  @Output() imagePick = new EventEmitter<string | File>();
  profileImage: string;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera,
  ) {}

  ngOnInit() {
  }

  async onPickImage() {
    const galleryOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      // targetHeight: 150,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    };

    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      // targetHeight: 150,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image',
      buttons: [
        {
          text: 'Gallery',
          icon: 'film',
          handler: () => {
            this.camera.getPicture(galleryOptions).then(imageData => {
              this.profileImage = 'data:image/jpeg;base64,' + imageData;
              this.imagePick.emit(this.profileImage);
            });
          }
        },
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.camera.getPicture(cameraOptions).then(imageData => {
              this.profileImage = 'data:image/jpeg;base64,' + imageData;
              this.imagePick.emit(this.profileImage);
            });
          }
        }
      ]
    });
    await actionSheet.present();
  }
}
