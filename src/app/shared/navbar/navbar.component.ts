import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // store the subscription to the AuthService User in the private userSub property
    this.userSub = this.authService.user.subscribe(user => {
      // if not a user then set value to false, otherwise true
      this.isAuthenticated = !user ? false : true;
    });
  }

  // clear the subscription
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onSignOut() {
    this.authService.signOut();
  }

}
