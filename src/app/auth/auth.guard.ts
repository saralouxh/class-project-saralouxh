import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map } from "rxjs/operators";

@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    // don't subscribe here, return instead because it is already an observable that returns a user object
    // we need the observable to return a boolean so we use pipe and map operator to transform observable value
    // !! converts a true-ish value, like an object(anything not null or undefined) to true
    return this.authService.user.pipe(map(user => {
      return !!user;
    }));
  }
}