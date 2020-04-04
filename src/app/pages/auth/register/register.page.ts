import { Component, OnInit, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.menuCtrl.swipeGesture(false);
    this.form = new FormGroup({
      firstName: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      lastName: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      }),
      gender: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      phoneNumber: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      location: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      address: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      image: new FormControl(null)
    });
  }

  onImagePicked(imageData: string | File) {
    let imageFile;
    if (typeof imageData === 'string') {
      imageFile = imageData;
    } else {
      imageFile = imageData;
    }
    this.form.patchValue({ image: imageFile });
  }

  onRegister() {
    if (!this.form.valid || !this.form.get('image').value) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Registering......'
    }).then(loadingEl => {
      loadingEl.present();
      this.authService
      .register(
        this.form.value.firstName,
        this.form.value.lastName,
        this.form.value.email,
        this.form.value.gender,
        this.form.value.password,
        this.form.value.phoneNumber,
        this.form.value.location,
        this.form.value.address,
        this.form.get('image').value
      )
      .subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.alertCtrl
          .create({
            header: 'Registeration Complete',
            message: 'You have succesfully registered. Proceed to login',
            buttons: [
              {
                text: 'Login',
                handler: () => {
                  this.router.navigate(['/login']);
                }
              }
            ]
          })
          .then(alertEl => {
            alertEl.present();
          });
      });
    });
  }
}
