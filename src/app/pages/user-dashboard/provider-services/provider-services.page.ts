import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, MenuController } from '@ionic/angular';

import { HandyService } from '../../../services/handy.service';
import { Service } from '../../../models/types';

@Component({
  selector: 'app-providere-services',
  templateUrl: './provider-services.page.html',
  styleUrls: ['./provider-services.page.scss'],
})
export class ProviderServicesPage implements OnInit {

  title: string;
  isLoading = false;
  services: Service[];

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router,
    private handyService: HandyService,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
    this.menuCtrl.swipeGesture(true);
    this.route.paramMap.subscribe(paraMap => {
      this.isLoading = true;
      if (!paraMap.has('category-id')) {
        this.navCtrl.navigateBack('/user-dashboard');
        return;
      }

      this.handyService.getCategoryServices(+paraMap.get('category-id')).subscribe(resData => {
        this.services = resData;
        this.title = resData[0].categories.name;
        this.isLoading = false;
      });
    });
  }

  onProviderServiceClick(serviceId) {
    this.router.navigate(['/user-dashboard', 'provider-list', serviceId]);
  }
}
