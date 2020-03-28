import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChild,
    ElementRef,
    Renderer2,
    Input
  } from '@angular/core';
  import { ModalController } from '@ionic/angular';
  import { Geolocation } from '@ionic-native/geolocation/ngx';
  import {} from 'google-maps';
  
  @Component({
    selector: 'app-map-modal',
    templateUrl: './map-modal.component.html',
    styleUrls: ['./map-modal.component.scss']
  })
  export class MapModalComponent implements OnInit, AfterViewInit {
    @ViewChild('map', { static: false }) mapElementRef: ElementRef;
    @Input() specialistLocation;
  
    constructor(
      private modalCtrl: ModalController,
      private renderer: Renderer2,
      private geolocation: Geolocation
    ) {}
  
    ngOnInit() {}
  
    ngAfterViewInit() {
      this.getGoogleMaps()
        .then(googleMaps => {
          const mapEl = this.mapElementRef.nativeElement;
  
          this.geolocation
            .getCurrentPosition()
            .then(resData => {
              const lat = resData.coords.latitude;
              const lng = resData.coords.longitude;
  
              const info = new google.maps.InfoWindow();
              const location = new google.maps.LatLng(lat, lng);
              const map = new google.maps.Map(mapEl, {
                center: location,
                zoom: 16
              });
              // info.setPosition(location);
              // info.setContent('Current Possition');
              // info.open(map);
              // const marker = new google.maps.Marker({
              //   position: location,
              //   map
              // });
              // marker.setMap(map);
  
              const geocoder = new google.maps.Geocoder();
              this.geocodeAddress(geocoder, map);
  
              googleMaps.event.addListenerOnce(map, 'idle', () => {
                this.renderer.addClass(mapEl, 'visible');
              });
            })
            .catch(error => {
              console.log('Error getting location', error);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  
    geocodeAddress(geocoder, resultsMap) {
      const address = this.specialistLocation;
      return geocoder.geocode({address}, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          resultsMap.setCenter(results[0].geometry.location);
          const marker = new google.maps.Marker({
            map: resultsMap,
            position: results[0].geometry.location,
            label: results[0].formatted_address
          });
          console.log(results[0].formatted_address);
          console.log(this.specialistLocation);
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  
    onCancel() {
      this.modalCtrl.dismiss();
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
  }
  