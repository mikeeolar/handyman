import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from "@angular/core";
import {
  ActionSheetController,
  NavController,
  AlertController,
  LoadingController,
  ModalController,
} from "@ionic/angular";
import { Handy } from "src/app/models/types";
import { HandyService } from "src/app/services/handy.service";
import { ActivatedRoute } from "@angular/router";
import { BookingService } from "src/app/services/booking.service";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { FormGroup, FormControl } from "@angular/forms";
import {} from "google-maps";
import { AuthService } from "src/app/services/auth.service";
// import * as moment from "moment";
import { CreateBookingComponent } from "../create-booking/create-booking.component";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-booking-details",
  templateUrl: "./booking-details.page.html",
  styleUrls: ["./booking-details.page.scss"],
})
export class BookingDetailsPage implements OnInit {
  @ViewChild("map", { static: false }) mapElementRef: ElementRef;
  @ViewChild("panel", { static: false }) panelElementRef: ElementRef;
  @ViewChild("total", { static: false }) totalElementRef: ElementRef;

  isLoading = false;
  form: FormGroup;
  selectedRadioGroup: string;
  allJobs: Handy[];
  service: string;
  userLocation: string;
  userAddress: string;
  providerLocation: string;
  providerAddress: string;
  isUserLocation = true;
  providerId: number;
  location: string;
  address: string;
  category: string;
  bookDate: string;
  bookTime: string;
  isSaved = true;
  providerName: string;
  providerImage: string;
  providerCategory: string;
  providerService: string;
  serverImage: string;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private handyService: HandyService,
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private renderer: Renderer2,
    private geolocation: Geolocation,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {
    this.serverImage = environment.ImageAPI;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.authService.userData().subscribe((user) => {
        this.handyService
          .getUserProfile(+paramMap.get("provider-id"))
          .subscribe((resData) => {
            this.allJobs = resData;
            this.service = paramMap.get("service");
            this.userLocation = user.location;
            this.userAddress = user.address;
            this.providerId = resData[0].providers.id;

            this.providerId = resData[0].providers.id;
            this.providerName =
              resData[0].providers.first_name +
              " " +
              resData[0].providers.last_name;
            this.providerCategory =
              resData[0].providers.provider_services[0].categories.name;
            this.providerService = paramMap.get("service");
            this.providerImage = this.serverImage + resData[0].providers.image;

            this.category =
              resData[0].providers.provider_services[0].categories.name;
            // this.bookDate = moment(new Date()).format("DD-MM-YYYY");
            // this.bookTime = moment(new Date().getTime()).format("h:mma");

            this.isUserLocation === true;
            this.bookDate = new Date().toLocaleDateString();
            this.bookTime = new Date().toLocaleTimeString();
            this.location = this.userLocation;
            this.address = this.userAddress;
            

            if (this.isUserLocation !== true) {
              this.location = resData[0].providers.location;
              this.address = resData[0].providers.address;
            }
          });
      });

      this.route.paramMap.subscribe((paraMap) => {
        this.bookingService
          .getAllJobs(+paraMap.get("provider-id"))
          .subscribe((resData) => {
            if (resData[0].status === "Accepted") {
              this.isLoading = false;
            }
          });
      });
    });

    this.form = new FormGroup({
      travelMode: new FormControl(null, {
        updateOn: "blur",
      }),
    });

    // this.route.paramMap.subscribe((paraMap) => {
    //   this.bookingService.getAllJobs(+paraMap.get('provider-id')).subscribe((resData) => {
    //     if (resData[0].status === 'Accepted') {
    //       this.isLoading = false;
    //     }
    //   });
    // });
  }

  refresh() {
    // this.route.paramMap.subscribe((paraMap) => {
    //   this.bookingService.getAllJobs(+paraMap.get('provider-id')).subscribe((resData) => {
    //     if (resData[0].status === 'Accepted') {
    //       this.isLoading = false;
    //       console.log(resData[0].status);
    //     }
    //   });
    // });
    this.ngOnInit();
  }

  ionViewDidLoad() {
    this.ngOnInit();
  }

  async changeLocation() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "SELECT LOCATION",
      buttons: [
        {
          text: "User Location",
          handler: () => {
            this.userLocationChange();
            this.authService.userData().subscribe((user) => {
              this.location = user.location;
              this.address = user.address;
              this.isUserLocation = true;
            });
          },
        },
        {
          text: "Provider Location",
          handler: () => {
            this.providerLocationChange();
            this.route.paramMap.subscribe((paramMap) => {
              this.handyService
                .getUserProfile(+paramMap.get("provider-id"))
                .subscribe((resData) => {
                  this.location = resData[0].providers.location;
                  this.address = resData[0].providers.address;
                  this.isUserLocation = false;
                });
            });
          },
        },
      ],
    });
    await actionSheet.present();
  }

  userLocationChange() {
    this.authService.userData().subscribe((user) => {
      this.userLocation = user.location;
      this.userAddress = user.address;
      this.isUserLocation = true;
    });
  }

  providerLocationChange() {
    this.route.paramMap.subscribe((paramMap) => {
      this.handyService
        .getUserProfile(+paramMap.get("provider-id"))
        .subscribe((resData) => {
          this.providerLocation = resData[0].providers.location;
          this.providerAddress = resData[0].providers.address;
          this.isUserLocation = false;
        });
    });
  }

  saveBooking() {
    let fetchedUserId: string;
    this.authService.userId.subscribe((resData) => {
      fetchedUserId = resData;
    });
    this.bookingService
      .addBooking(
        +fetchedUserId,
        this.providerId,
        this.category,
        this.service,
        this.bookDate,
        this.bookTime,
        this.location,
        this.address,
        "Instant Booking"
      )
      .subscribe(() => {
        this.isLoading = true;
        this.alertCtrl
          .create({
            header: "Booking Succesfull",
            message:
              // tslint:disable-next-line: max-line-length
              "Please wait while your service provider accepts your request",
            buttons: [
              {
                text: "OK",
                role: "cancel",
              },
            ],
          })
          .then((alertEl) => {
            alertEl.present();
          });
      });
  }

  proceed() {
    this.loadingCtrl
      .create({ keyboardClose: true, message: "Please wait..." })
      .then((loadingEl) => {
        loadingEl.present();
        if (this.isSaved) {
          this.saveBooking();
          loadingEl.dismiss();
        }
      });
  }

  bookLater() {
    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: {
          providerId: this.providerId,
          providerName: this.providerName,
          providerImage: this.providerImage,
          providerCategory: this.providerCategory,
          providerService: this.providerService,
        },
        mode: "md"
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }

  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyBIg3AmCwLxjV2gCUIBluBYr20gHVa_oTA";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject("Google maps SDK not available.");
        }
      };
    });
  }
}
