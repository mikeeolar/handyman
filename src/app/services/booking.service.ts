import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { Booking } from '../models/booking.mode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookings = new BehaviorSubject<Booking>(null);

  constructor(private http: HttpClient, private authService: AuthService) {}

  addBooking(
    userId: number,
    specialistId: number,
    category: string,
    service: string,
    bookDate: Date,
    timeFrom: Date,
    timeTo: Date,
    location: string,
    address: string,
    addInfo: string
  ) {
    return this.http.post<{ [key: string]: any }>(
      environment.serverAPI + 'new-booking',
      {
        userId,
        specialistId,
        category,
        service,
        bookDate,
        timeFrom,
        timeTo,
        location,
        address,
        addInfo
      }
    );
  }
}
