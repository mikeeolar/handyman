import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { environment } from "src/environments/environment";
import { BookingService } from "src/app/services/booking.service";
import { Handy } from "src/app/models/types";
import { ActivatedRoute, Router } from "@angular/router";
import {
  NavController,
  ModalController,
  AlertController,
} from "@ionic/angular";
import { JobReviewComponent } from "../job-review/job-review.component";
import { EditBookingComponent } from "../edit-booking/edit-booking.component";
// import * as moment from "moment";

@Component({
  selector: "app-job-booking-detail",
  templateUrl: "./job-booking-detail.page.html",
  styleUrls: ["./job-booking-detail.page.scss"],
})
export class JobBookingDetailPage implements OnInit {
  serverImage: string;
  jobDetails: Handy[];
  providerId: number;
  providerName: string;
  providerCategory: string;
  providerImage: string;
  providerService: string;
  jobUpdated: string;
  pendingTime: string;
  acceptjobTime: string;
  startJobTime: string;
  completeJobTime: string;
  isComplete: boolean;

  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {
    this.serverImage = environment.ImageAPI;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paraMap) => {
      if (!paraMap.has("provider-id")) {
        this.navCtrl.navigateBack("/booking");
        return;
      }
      this.bookingService
        .getJobDetails(+paraMap.get("provider-id"))
        .subscribe((resData) => {
          this.jobDetails = resData;
          this.providerId = resData[0].provider_id;
          this.providerName =
            resData[0].providers.first_name +
            " " +
            resData[0].providers.first_name;
          this.providerCategory = resData[0].category;
          this.providerService = resData[0].service;
          this.providerImage = this.serverImage + resData[0].providers.image;
          this.pendingTime = new Date(resData[0].created_at).toUTCString();
          // this.pendingTime = new Date(resData[0].created_at).toDateString() + ", " + new Date(resData[0].created_at).toLocaleTimeString();
          if (resData[0].status === 'Completed') {
            this.isComplete = true;
          }
        });
      this.bookingService
        .getJobs(+paraMap.get("provider-id"))
        .subscribe((jobs) => {
          this.acceptjobTime = new Date(jobs[0].accepted_at).toUTCString();
          this.startJobTime = new Date(jobs[0].started_at).toUTCString();
          this.completeJobTime = new Date(jobs[0].completed_at).toUTCString();

          // this.completeJobTime = moment(jobs[0].completed_at).format(
          //   "DD-MM-YYYY h:mma"
          // );
        });
    });
  }

  viewProfile(providerId: number, service: string) {
    this.router.navigate([
      "/user-dashboard",
      "provider-profile",
      providerId,
      service,
    ]);
  }

  onReviewModal() {
    this.modalCtrl
      .create({
        component: JobReviewComponent,
        componentProps: {
          providerId: this.providerId,
          providerName: this.providerName,
          providerImage: this.providerImage,
          providerCategory: this.providerCategory,
          providerService: this.providerService,
        },
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }

  onEditBookingModal() {
    this.modalCtrl
      .create({
        component: EditBookingComponent,
        componentProps: {
          providerId: this.providerId,
          providerName: this.providerName,
          providerImage: this.providerImage,
          providerCategory: this.providerCategory,
          providerService: this.providerService,
        },
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }

  refresh() {
    this.ngOnInit();
  }

  onBookingCancel(providerId: number) {
    this.alertCtrl
      .create({
        header: "Confirmation Message",
        message: "Are you sure you want to cancel this current booking.",
        buttons: [
          {
            text: "Yes",
            handler: () => {
              this.bookingService
                .cancelBooking(providerId)
                .subscribe((resData) => {
                  this.router.navigate(["/booking"]);
                });
            },
          },
          {
            text: "No",
            role: "cancel",
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }
}
