import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { HandyService } from 'src/app/services/handy.service';
import { environment } from 'src/environments/environment';
import { Handy } from 'src/app/models/types';
import { CreateBookingComponent } from '../../booking/create-booking/create-booking.component';
import { MapModalComponent } from 'src/app/shared/map-modal/map-modal.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss']
})
export class UserProfilePage implements OnInit {
  serverImage: string;
  userProfile: Handy[];
  specialistId: number;
  address: string;
  specialistLocation: string;
  specialistName: string;
  specialistImage: string;
  specialistCategory: string;
  specialistService: string;
  userServices: any[];

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router,
    private handyService: HandyService,
    private modalCtrl: ModalController
  ) {
    this.serverImage = environment.ImageAPI;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('user-id')) {
        this.navCtrl.navigateBack('/user-dashboard');
        return;
      }

      this.handyService
        .getUserProfile(+paramMap.get('user-id'))
        .subscribe(resData => {
          this.userProfile = resData;
          this.userServices = resData[0].users.user_services;

          this.specialistId = resData[0].users.id;
          this.specialistName = resData[0].users.first_name + ' ' + resData[0].users.last_name;
          this.specialistCategory = resData[0].users.user_services[0].categories.name;
          this.specialistService = paramMap.get('service');
          this.specialistImage = this.serverImage + resData[0].users.image;
          this.specialistLocation = resData[0].job_location;
        });
    });
  }

  onBookingModal() {
    this.modalCtrl.create({
      component: CreateBookingComponent,
      componentProps: {
        specialistId: this.specialistId,
        specialistName: this.specialistName,
        specialistImage: this.specialistImage,
        specialistCategory: this.specialistCategory,
        specialistService: this.specialistService
      }
    }).then(modalEl => {
      modalEl.present();
    });
  }

  openMap() {
    this.modalCtrl.create({
      component: MapModalComponent,
      componentProps: {
        userId: this.specialistId,
        specialistLocation: this.specialistLocation
      }
    }).then(modalEl => {
      modalEl.present();
    });
  }
}
