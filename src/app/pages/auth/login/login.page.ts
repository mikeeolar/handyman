import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {
  NavController,
  AlertController,
  LoadingController,
  MenuController
} from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  isLogin = true;

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.menuCtrl.swipeGesture(false);
  }

  login(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then(loadingEl => {
        loadingEl.present();
        if (this.isLogin) {
          this.authService
            .login(form.value.email, form.value.password, 'user-app')
            .subscribe(
              data => {
                this.alertCtrl
                  .create({
                    header: 'Success',
                    message: 'Login Successfully',
                    buttons: [
                      {
                        text: 'Ok',
                        handler: () => {
                          this.router.navigate(['/user-dashboard']);
                        }
                      }
                    ]
                  })
                  .then(alertEl => {
                    loadingEl.dismiss();
                    alertEl.present();
                  });
              },
              error => {
                loadingEl.dismiss();
                const errMsg = error.error.message;
                if (errMsg === 'Unauthorized') {
                  this.alertCtrl
                  .create({
                    header: 'Error',
                    message: 'Invalid Email or Password',
                    buttons: [
                      {
                        text: 'Ok'
                      }
                    ]
                  })
                  .then(alertEl => {
                    loadingEl.dismiss();
                    alertEl.present();
                  });
                } else {
                  console.log(error);
                }
              }
            );
        }
      });
  }
}
