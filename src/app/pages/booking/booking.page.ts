import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "src/app/services/auth.service";
import { BookingService } from "src/app/services/booking.service";
import { MenuController } from "@ionic/angular";
import { Handy } from "src/app/models/types";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-booking",
  templateUrl: "./booking.page.html",
  styleUrls: ["./booking.page.scss"],
})
export class BookingPage implements OnInit, OnDestroy {
  serverImage: string;
  providerBookings: Handy[];
  providerId: number;
  isPending = true;
  private bookingSub: Subscription;

  constructor(
    private router: Router,
    private bookingService: BookingService,
    private authService: AuthService
  ) {
    this.serverImage = environment.ImageAPI;
  }

  ngOnInit() {
    this.authService.userId.subscribe((fetchedUserId) => {
      this.bookingSub = this.bookingService
        .getUpcomingJobs(+fetchedUserId)
        .subscribe((resData) => {
          this.providerBookings = resData;
        });
    });
  }

  viewJobDetails(providerId) {
    this.router.navigate(["/booking", "job-details", providerId]);
  }

  // ionViewWillEnter() {
  //   // this.ngOnInit();
  // }

  // ionViewHasEnter() {
  //   this.ngOnInit();
  // }
  // ngAfterViewInit() {
  //   this.ngOnInit();
  // }

  segmentChanged(event: any) {
    if (event.detail.value === "upcoming") {
      this.authService.userId.subscribe((fetchedId) => {
        this.bookingSub = this.bookingService
          .getUpcomingJobs(+fetchedId)
          .subscribe((resData) => {
            this.providerBookings = resData;
          });
      });
    }
    if (event.detail.value === "past") {
      this.authService.userId.subscribe((fetchedId) => {
        this.bookingSub = this.bookingService
          .getPastJobs(+fetchedId)
          .subscribe((resData) => {
            this.providerBookings = resData;
          });
      });
    }
  }

  ngOnDestroy() {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }
}
