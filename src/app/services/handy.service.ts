import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Service, Handy } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class HandyService {
  constructor(private http: HttpClient) {}

  getCategoryServices(categoryId: number) {
    return this.http
      .get<Service>(environment.serverAPI + 'services/' + categoryId)
      .pipe(
        map(resData => {
          return resData.services;
        })
      );
  }

  getUserWithServices(serviceId: number) {
    return this.http
      .get<Handy>(environment.serverAPI + 'provider-services/' + serviceId)
      .pipe(
        map(resData => {
          return resData.ProviderServices;
        })
      );
  }

  getUserProfile(userId: number) {
    return this.http
      .get<Handy>(environment.serverAPI + 'provider-profile/' + userId)
      .pipe(
        map(resData => {
          return resData.ProviderProfile;
        })
      );
  }
}
