import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { BookingService } from '../../../services/booking.service';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {

  currentDate: Date;
  form: FormGroup;

  @Input() specialistId;
  @Input() specialistName;
  @Input() specialistImage;
  @Input() specialistCategory;
  @Input() specialistService;

  constructor(
    private modalCtrl: ModalController,
    private bookingService: BookingService,
    private alertCtrl: AlertController,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.currentDate = new Date();
    this.form = new FormGroup({
      date: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      timeFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      timeTo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      location: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      address: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      addInfo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  timesValid() {
    const startTime = new Date(this.form.value.timeFrom);
    const endTime = new Date(this.form.value.timeTo);
    return endTime > startTime;
  }

  dateValid() {
    const date = new Date(this.form.value.date).toLocaleDateString();
    const today = new Date().toLocaleDateString();
    return date >= today;
  }

  onBook() {
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
        this.specialistId,
        this.specialistCategory,
        this.specialistService,
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
            header: 'Booking Succesfull',
            message:
// tslint:disable-next-line: max-line-length
              'Your specialist has recieved the request and will get back to you shortly. You can check the status of your request on the Bookings menu item.',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel'
              },
              {
                text: 'View Bookings',
                handler: () => {
                  this.onCancel();
                  this.router.navigate(['/bookings']);
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
