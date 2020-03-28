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
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss']
})
export class MapModalComponent implements OnInit, AfterViewInit {
  @ViewChild('map', { static: false }) mapElementRef: ElementRef;
  @ViewChild('panel', { static: false }) panelElementRef: ElementRef;
  @ViewChild('total', { static: false }) totalElementRef: ElementRef;
  @Input() specialistLocation;
  form: FormGroup;
  selectedRadioGroup: string;

  constructor(
    private modalCtrl: ModalController,
    private renderer: Renderer2,
    private geolocation: Geolocation
  ) {}

  ngOnInit() {
    // this.panelElementRef.nativeElement.innerHTML = '';
    this.form = new FormGroup({
      travelMode: new FormControl(null, {
        updateOn: 'blur'
      })
    });
  }

  ngAfterViewInit() {
    // this.panelElementRef.nativeElement.innerHTML = '';
    this.getGoogleMaps()
      .then(googleMaps => {
        const mapEl = this.mapElementRef.nativeElement;

        this.geolocation
          .getCurrentPosition()
          .then(resData => {
            const lat = resData.coords.latitude;
            const lng = resData.coords.longitude;

            const location = new google.maps.LatLng(lat, lng);
            const map = new google.maps.Map(mapEl, {
              center: location,
              zoom: 16
            });

            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer({
              draggable: false,
              map,
              panel: this.panelElementRef.nativeElement
            });

            const geocoder = new google.maps.Geocoder();
            this.calculateAndDisplayRoute(
              directionsService,
              directionsRenderer,
              geocoder,
              'DRIVING'
            );
            directionsRenderer.setMap(map);
            directionsRenderer.addListener('directions_changed', () => {
              this.computeTotalDistance(directionsRenderer.getDirections());
            });

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

  radioGroupChange(event) {
    // this.panelElementRef.nativeElement.innerHTML = '';
    this.getGoogleMaps()
      .then(googleMaps => {
        const mapEl = this.mapElementRef.nativeElement;

        this.geolocation
          .getCurrentPosition()
          .then(resData => {
            const lat = resData.coords.latitude;
            const lng = resData.coords.longitude;

            const location = new google.maps.LatLng(lat, lng);
            const map = new google.maps.Map(mapEl, {
              center: location,
              zoom: 64
            });

            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer({
              draggable: false,
              map,
              panel: this.panelElementRef.nativeElement
            });

            const geocoder = new google.maps.Geocoder();
            this.calculateAndDisplayRoute(
              directionsService,
              directionsRenderer,
              geocoder,
              event.detail.value
            );
            directionsRenderer.setMap(map);
            directionsRenderer.addListener('directions_changed', () => {
              this.computeTotalDistance(directionsRenderer.getDirections());
            });

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

  calculateAndDisplayRoute(directionsService, directionsRenderer, geocoder, travelMode) {
    this.panelElementRef.nativeElement.innerHTML = '';
    let lat: number;
    let lng: number;
    let currentLocaion: string;
    const destination = this.specialistLocation + ', Lagos';

    this.geolocation
      .getCurrentPosition()
      .then(resData => {
        lat = resData.coords.latitude;
        lng = resData.coords.longitude;

        const location = new google.maps.LatLng(lat, lng);
        geocoder.geocode({ location }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            currentLocaion = results[6].formatted_address;
            directionsService.route(
              {
                origin: results[0].geometry.location,
                destination,
                travelMode,
                provideRouteAlternatives: true,
                drivingOptions: {
                  departureTime: new Date(),
                  trafficModel: 'optimistic'
                },
                unitSystem: google.maps.UnitSystem.METRIC
              },
              (response, statu) => {
                if (statu === google.maps.GeocoderStatus.OK) {
                  directionsRenderer.setDirections(response);
                } else {
                  window.alert('Directions request failed due to ' + status);
                }
              }
            );
          } else {
            alert(
              'Geocode was not successful for the following reason: ' + status
            );
          }
        });
      })
      .catch(error => {
        console.log('Error getting location', error);
      });
  }

  computeTotalDistance(result) {
    let total = 0;
    const myroute = result.routes[0];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    this.totalElementRef.nativeElement.innerHTML = total + ' km';
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
