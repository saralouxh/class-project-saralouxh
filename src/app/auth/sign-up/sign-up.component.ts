import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  signUpObs: Observable<AuthResponseData>;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSignIn(form: NgForm) {
    // check if form is valid
    if (!form.valid) {
      return;
    }
    // extract email and password
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

      this.signUpObs = this.authService.signup(email, password);

      this.signUpObs.subscribe({
        next: () => this.router.navigate(['/home']),
        error: (errorMessage) => this.error = errorMessage,
      });

      this.isLoading = false;

    form.reset();
  }

}
