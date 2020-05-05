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
    bookDate: string,
    time: string,
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
        time,
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

  getUpcomingJobs(userId: number): Observable<any> {
    return this.http
      .get<Handy>(environment.serverAPI + 'upcoming-jobs/' + userId)
      .pipe(
        map(resData => {
          return resData.UpcomingJobs;
        })
      );
  }

  getPastJobs(userId: number): Observable<any> {
    return this.http
      .get<Handy>(environment.serverAPI + 'past-jobs/' + userId)
      .pipe(
        map(resData => {
          return resData.PastJobs;
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

  getJobs(providerId: number): Observable<any> {
    return this.http
      .get<Handy>(environment.serverAPI + "all-jobs/" + providerId)
      .pipe(
        map((resData) => {
          return resData.Jobs;
        })
      );
  }

  getAllJobs(providerId: number) {
    return this.http
      .get<Handy>(environment.serverAPI + 'get-jobs/' + providerId)
      .pipe(
        map(resData => {
          return resData.Jobs;
        })
      );
  }

  // upcomingJobs(userId: number) {
  //   return this.http
  //     .get<Handy>(environment.serverAPI + 'upcoming-jobs/' + userId)
  //     .pipe(
  //       map(resData => {
  //         return resData;
  //       })
  //     );
  // }

  pendingJobs(userId: number) {
    return this.http
      .get<Handy>(environment.serverAPI + 'upcoming-jobs/' + userId)
      .pipe(
        map(resData => {
          return resData.PendingJobs;
        })
      );
  }

  acceptedJobs(userId: number) {
    return this.http
      .get<Handy>(environment.serverAPI + 'upcoming-jobs/' + userId)
      .pipe(
        map(resData => {
          return resData.AcceptedJobs;
        })
      );
  }

  startedJobs(userId: number) {
    return this.http
      .get<Handy>(environment.serverAPI + 'upcoming-jobs/' + userId)
      .pipe(
        map(resData => {
          return resData.StartedJobs;
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
