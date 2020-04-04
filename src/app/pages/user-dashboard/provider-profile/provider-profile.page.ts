import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { HandyService } from 'src/app/services/handy.service';
import { environment } from 'src/environments/environment';
import { Handy } from 'src/app/models/types';
import { CreateBookingComponent } from '../../booking/create-booking/create-booking.component';
import { MapModalComponent } from 'src/app/shared/map-modal/map-modal.component';

@Component({
  selector: 'app-provider-profile',
  templateUrl: './provider-profile.page.html',
  styleUrls: ['./provider-profile.page.scss']
})
export class ProviderProfilePage implements OnInit {
  serverImage: string;
  providerProfile: Handy[];
  providerId: number;
  address: string;
  providerName: string;
  providerLocation: string;
  providerImage: string;
  providerCategory: string;
  providerService: string;
  providerServices: any[];

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
          this.providerProfile = resData;
          this.providerServices = resData[0].providers.provider_services;

          this.providerId = resData[0].providers.id;
          this.providerName = resData[0].providers.first_name + ' ' + resData[0].providers.last_name;
          this.providerCategory = resData[0].providers.provider_services[0].categories.name;
          this.providerService = paramMap.get('service');
          this.providerImage = this.serverImage + resData[0].providers.image;
          this.providerLocation = resData[0].job_location;
        });
    });
  }

  onBookingModal() {
    this.modalCtrl.create({
      component: CreateBookingComponent,
      componentProps: {
        providerId: this.providerId,
        providerName: this.providerName,
        providerImage: this.providerImage,
        providerCategory: this.providerCategory,
        providerService: this.providerService
      }
    }).then(modalEl => {
      modalEl.present();
    });
  }

  openMap() {
    this.modalCtrl.create({
      component: MapModalComponent,
      componentProps: {
        providerId: this.providerId,
        providerLocation: this.providerLocation
      }
    }).then(modalEl => {
      modalEl.present();
    });
  }
}
