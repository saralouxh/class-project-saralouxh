import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  loginObs: Observable<AuthResponseData>;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    // check if form is valid
    if (!form.valid) {
      return;
    }
    // extract email and password
    const { email, password } = form.value;

    this.isLoading = true;

    this.loginObs = this.authService.login(email, password);

    this.loginObs.subscribe({
      next: () => this.router.navigate(['/home']),
      error: (errorMessage) => this.error = errorMessage,
    }
        // resData => {
        //   console.log(resData);
        //   // set isLoading back to false because we're not loading anymore, we got the response
        //   this.isLoading = false;
        //   this.router.navigate(['/home']);
        // },
        // errorMessage => {
        //   console.log(errorMessage);
        //   this.error = errorMessage;

        // }
    );

    this.isLoading = false;

    // reset form
    form.reset();
  }
}
