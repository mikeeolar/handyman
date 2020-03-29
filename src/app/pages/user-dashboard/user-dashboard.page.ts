import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Handy } from 'src/app/models/types';
import { User } from 'src/app/models/user.model';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss']
})
export class UserDashboardPage implements OnInit, AfterViewInit {

  users: User;
  userId: number;
  userImage: string;
  userName: string;
  private resetBackButton: any;
  lat: any;
  lng: any;
  currentLocation: string;

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private authService: AuthService,
    private geolocation: Geolocation
  ) {}

  ngOnInit() {
    this.menuCtrl.swipeGesture(false);
    this.authService.userData().subscribe(users => {
      this.users = users;
    });
  }

  ngAfterViewInit() {
    this.getGoogleMaps().then(googleMaps => {
      this.geolocation.getCurrentPosition().then(resData => {
        this.lat = resData.coords.latitude;
        this.lng = resData.coords.longitude;

        const geocoder = new google.maps.Geocoder();
        this.geocodeLatLng(geocoder);

      }).catch((error) => {
        console.log('Error getting location', error);
      });
    }).catch(err => {
      console.log(err);
    });
  }

  geocodeLatLng(geocoder) {
    const lat = this.lat;
    const lng = this.lng;

    const location = new google.maps.LatLng(this.lat, this.lng);
    geocoder.geocode({location}, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        this.currentLocation = results[5].formatted_address;
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src =
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyBIg3AmCwLxjV2gCUIBluBYr20gHVa_oTA';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google maps SDK not available.');
        }
      };
    });
  }

  menuToogle() {
    this.menuCtrl.enable(true, '1');
    this.menuCtrl.toggle('1');
  }

  ionViewWillEnter() {
    this.menuCtrl.swipeGesture(false);
  }

  automobile() {
    this.router.navigate(['/user-dashboard', 'user-services', 1]);
  }

  electrical() {
    this.router.navigate(['/user-dashboard', 'user-services', 2]);
  }

  plumbing() {
    this.router.navigate(['/user-dashboard', 'user-services', 3]);
  }

  cleaning() {
    this.router.navigate(['/user-dashboard', 'user-services', 4]);
  }

  electronics() {
    this.router.navigate(['/user-dashboard', 'user-services', 5]);
  }

  carpentry() {
    this.router.navigate(['/user-dashboard', 'user-services', 6]);
  }

  beauty() {
    this.router.navigate(['/user-dashboard', 'user-services', 7]);
  }

  events() {
    this.router.navigate(['/user-dashboard', 'user-services', 8]);
  }

  fumigation() {
    this.router.navigate(['/user-dashboard', 'user-services', 9]);
  }
}
