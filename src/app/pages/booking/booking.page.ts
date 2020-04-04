import { Component, OnInit, AfterViewInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "src/app/services/auth.service";
import { BookingService } from "src/app/services/booking.service";
import { MenuController } from "@ionic/angular";
import { Handy } from "src/app/models/types";
import { environment } from "src/environments/environment";
import { Router } from '@angular/router';

@Component({
  selector: "app-booking",
  templateUrl: "./booking.page.html",
  styleUrls: ["./booking.page.scss"]
})
export class BookingPage implements OnInit, AfterViewInit {
  serverImage: string;
  providerBookings: Handy[];
  providerId: number;

  constructor(
    private router: Router,
    private bookingService: BookingService,
    private authService: AuthService
  ) {
    this.serverImage = environment.ImageAPI;
  }

  ngOnInit() {
    this.authService.userId.subscribe(fetchedUserId => {
      this.bookingService.getAllBookings(+fetchedUserId)
        .subscribe(resData => {
          this.providerBookings = resData;
        });
    });
  }

  viewJobDetails(providerId) {
    this.router.navigate(['/booking', 'job-details', providerId]);
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  ionViewHasEnter() {
    this.ngOnInit();
  }
  ngAfterViewInit() {
    this.ngOnInit();
  }
}
