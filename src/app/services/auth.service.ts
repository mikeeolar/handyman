import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = new BehaviorSubject<User>(null);
  isLoggedIn = false;
  token:any;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage
  ) {}

  login(email: string, password: string) {
    return this.http.post(environment.serverAPI + 'auth/login', { email, password }
    ).pipe(
      tap(token => {
        this.storage.setItem('token', token)
        .then(
          () => {
            console.log('Token Stored');
          },
          error => console.error('Error storing item', error)
        );
        this.token = token;
        this.isLoggedIn = true;
        return token;
      }),
    );
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    password: string,
    phoneNumber: string,
    location: string,
    address: string,
    image: string
  ) {
    return this.http.post<{ [key: string]: any }>(
      environment.serverAPI + 'auth/register',
      {
        firstName,
        lastName,
        email,
        gender,
        password,
        phoneNumber,
        location,
        address,
        image
      }
    );
  }

  logout() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get(environment.serverAPI + 'auth/logout', { headers: headers })
    .pipe(
      tap(data => {
        this.storage.remove("token");
        this.isLoggedIn = false;
        delete this.token;
        return data;
      })
    )
  }

  // user() {
  //   const headers = new HttpHeaders({
  //     'Authorization': this.token["token_type"]+" "+this.token["access_token"]
  //   });
  //   return this.http.get<User>(environment.serverAPI + 'auth/user', { headers: headers })
  //   .pipe(
  //     tap(user => {
  //       return user;
  //     })
  //   )
  // }
  
  userData() {
    const headers = new HttpHeaders({
      Authorization: this.token.token_type + ' ' + this.token.access_token
    });
    return this.http
      .get<User>(environment.serverAPI + 'auth/user', { headers })
      .pipe(
        tap(user => {
          this.users.next(user);
          return user;
        })
      );
  }

  get userId() {
    return this.users.asObservable().pipe(
      map(user => {
        if (user) {
          return user.id;
        } else {
          return null;
        }
      })
    );
  }

  getUsers() {
    return this.users.asObservable().pipe(
      map(user => {
        if (user) {
          return user;
        } else {
          return null;
        }
      })
    );
  }

  get name() {
    return this.users.asObservable().pipe(
      map(user => {
        if (user) {
          return user.first_name + ' ' + user.last_name;
        } else {
          return null;
        }
      })
    );
  }

  get userImage() {
    return this.users.asObservable().pipe(
      map(user => {
        if (user) {
          return user.image;
        } else {
          return null;
        }
      })
    );
  }

  get email() {
    return this.users.asObservable().pipe(
      map(user => {
        if (user) {
          return user.email;
        } else {
          return null;
        }
      })
    );
  }

  getToken() {
    return this.storage.getItem('token').then(
      data => {
        this.token = data;
        if (this.token != null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn = false;
      }
    );
  }
}
