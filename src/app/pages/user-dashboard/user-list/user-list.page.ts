import { Component, OnInit } from '@angular/core';
import { Handy } from 'src/app/models/types';
import { HandyService } from 'src/app/services/handy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss']
})
export class UserListPage implements OnInit {
  userServices: Handy[];
  title: string;
  categoryId: number;
  serverImage: string;
  
  constructor(
    private handyService: HandyService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthService
  ) {
    this.serverImage = environment.ImageAPI;
  }

  ngOnInit() {

    let fetchedUserId: string;
    this.authService.userId.subscribe(resData => {
      fetchedUserId = resData;
    });

    this.route.paramMap.subscribe(paraMap => {
      if (!paraMap.has('service-id')) {
        this.navCtrl.navigateBack('/user-dashboard');
        return;
      }

      this.handyService.getUserWithServices(+paraMap.get('service-id')).subscribe(resData => {
        this.userServices = resData;
        this.title = resData[0].services.name;
        this.categoryId = resData[0].categories.id;
      });
    });
  }

  userProfilePage(userId) {
    this.router.navigate(['/user-dashboard', 'user-profile', userId, this.title]);
  }
}
