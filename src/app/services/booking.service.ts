import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Booking } from '../models/booking.mode';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Service, Handy } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookings = new BehaviorSubject<Booking>(null);

  constructor(private http: HttpClient, private authService: AuthService) {}

  addBooking(
    userId: number,
    providerId: number,
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
        providerId,
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

  getAllBookings(userId: number): Observable<any> {
    return this.http
      .get<Handy>(environment.serverAPI + 'provider-bookings/' + userId)
      .pipe(
        map(resData => {
          return resData.ProviderBookings;
        })
      );
  }

  getJobDetails(providerId: number): Observable<any> {
    return this.http
      .get<Handy>(environment.serverAPI + 'job-details/' + providerId)
      .pipe(
        map(resData => {
          return resData.ProviderBookings;
        })
      );
  }

  cancelBooking(providerId: number) {
    return this.http
    .get<{ [key: string]: any }>(environment.serverAPI + 'cancel/' + providerId)
    .pipe(
      map(resData => {
        return resData.Message;
      })
    );
  }
}
