import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Observable, Subject, throwError } from "rxjs";
import { Router } from "@angular/router";
import { User } from "./user.model";
import { environment } from "src/environments/environment";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // subject: can subscribe to and will get information whenever new data is emitted(.next)
  // difference is a behavior subject gives subscribers access to the previously emitted value even if they haven't subscribed at the point of time that value was emitted
  // this means we can get access to the currently active user even if we subscribe after the user has been emitted
  user = new BehaviorSubject<User>(null);
  private expTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  // Sign Up
  signup(email: string, password: string) {
    // return this prepared observable so that we can subscribe in the auth component
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey,
      // request body payload from Firebase Rest Auth API
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
    .pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      })
    );
  }

  // Login
  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey,
       {
        email: email,
        password: password,
        returnSecureToken: true
       }
    )
    .pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        )
        // this.router.navigate(['/home']);
      })
    );
  }

  signOut() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.expTimer) {
      clearTimeout(this.expTimer);
    }
    this.expTimer = null;
    this.router.navigate(['/login']);
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const { email, id, _token, _tokenExpirationDate } = userData;

    const loadedUser = new User( email, id, _token, new Date(_tokenExpirationDate));

    if (loadedUser.token) this.user.next(loadedUser);

      const expirationDate = new Date(_tokenExpirationDate).getTime() - new Date().getTime();

      this.autoSignOut(expirationDate);

      this.router.navigate(['/home']);
  }

  autoSignOut(expirationDuration: number) {
    this.expTimer = setTimeout(() => {
      this.signOut();
    }, expirationDuration);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occured";
    // if errorRes does not have an error key, or no nested error key, then return errorMessage
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email is already registered';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is invalid';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }

  private handleAuthentication(
    email: string,
    userID: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );

    // create new user instance
    const authUser = new User(
      email,
      userID,
      token,
      expirationDate
    );

    // emit new user instance
    this.user.next(authUser);

    // set a new timer for expiration token
    this.autoSignOut(expiresIn * 1000);

    // save the stringified user instance
    localStorage.setItem('userData', JSON.stringify(authUser));
  }

}