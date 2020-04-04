import { Component, OnInit, Input } from "@angular/core";
import { ModalController, AlertController } from "@ionic/angular";
import { BookingService } from "src/app/services/booking.service";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Handy } from "src/app/models/types";

@Component({
  selector: "app-edit-booking",
  templateUrl: "./edit-booking.component.html",
  styleUrls: ["./edit-booking.component.scss"]
})
export class EditBookingComponent implements OnInit {
  currentDate: Date;
  form: FormGroup;
  providerBookings: Handy[];

  @Input() providerId;
  @Input() providerName;
  @Input() providerImage;
  @Input() providerCategory;
  @Input() providerService;

  constructor(
    private modalCtrl: ModalController,
    private bookingService: BookingService,
    private alertCtrl: AlertController,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentDate = new Date();
    this.authService.userId.subscribe(fetchedUserId => {
      this.bookingService.getAllBookings(+fetchedUserId).subscribe(resData => {
        this.providerBookings = resData;
        this.form = new FormGroup({
          date: new FormControl(this.providerBookings[0].book_date, {
            updateOn: "blur",
            validators: [Validators.required]
          }),
          timeFrom: new FormControl(null),
          timeTo: new FormControl(null),
          location: new FormControl(this.providerBookings[0].location, {
            updateOn: "blur",
            validators: [Validators.required]
          }),
          address: new FormControl(this.providerBookings[0].address, {
            updateOn: "blur",
            validators: [Validators.required]
          }),
          addInfo: new FormControl(this.providerBookings[0].additional_info, {
            updateOn: "blur",
            validators: [Validators.required]
          })
        });
      });
    });
  }

  timesValid() {
    const startTime = new Date(this.form.get('timeFrom').value);
    const endTime = new Date(this.form.get('timeTo').value);
    return endTime > startTime;
  }

  dateValid() {
    const date = new Date(this.form.get('date').value).toLocaleDateString();
    const today = new Date().toLocaleDateString();
    return date >= today;
  }

  onUpdateBook() {
    if (!this.form.valid || !this.dateValid || !this.timesValid()) {
      return;
    }

    let fetchedUserId: string;
    this.authService.userId.subscribe(resData => {
      fetchedUserId = resData;
    });

    // console.log(this.form);
    // console.log(new Date(this.form.value.timeFrom).toLocaleDateString());
    this.bookingService
      .addBooking(
        +fetchedUserId,
        this.providerId,
        this.providerCategory,
        this.providerService,
        this.form.value.date,
        this.form.value.timeFrom,
        this.form.value.timeTo,
        this.form.value.location,
        this.form.value.address,
        this.form.value.addInfo
      )
      .subscribe(resData => {
        this.form.reset();
        this.alertCtrl
          .create({
            header: "Booking Succesfull",
            message:
              // tslint:disable-next-line: max-line-length
              "Your Provider has recieved the request and will get back to you shortly. You can check the status of your request on the Bookings menu item.",
            buttons: [
              {
                text: "Cancel",
                role: "cancel"
              },
              {
                text: "View Bookings",
                handler: () => {
                  this.onCancel();
                  this.router.navigate(["/booking"]);
                }
              }
            ]
          })
          .then(alertEl => {
            alertEl.present();
          });
      });
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }
}
