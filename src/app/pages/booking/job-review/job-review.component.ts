import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { BookingService } from 'src/app/services/booking.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-job-review',
  templateUrl: './job-review.component.html',
  styleUrls: ['./job-review.component.scss'],
})
export class JobReviewComponent implements OnInit {

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
  ) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }

}
