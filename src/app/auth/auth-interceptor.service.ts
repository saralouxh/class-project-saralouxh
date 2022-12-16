import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpParams } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { take, exhaustMap} from 'rxjs/operators';

@Injectable()

export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // reach out to AuthService user, get current user
    // to make sure we only get the user once, use pipe then take operator
    // this tells rxjs that we only want to take one value from that observable, then automatically unsubscribe
    // return this overall observable, this means we can still subscribe
    return this.authService.user.pipe(take(1),
      // exhaustMap waits for user observable to complete then replaces it with the inner observable we return inside of the function we pass to exhaustMap, which is the handle observable
      exhaustMap(user => {
        // because user is initially set to null, add a check here
        // if we don't have a user, then return next handle for original requests so we don't try to modify it
        if (!user) {
          return next.handle(req);
        }
        // clone request and update it
        // auth is the name of the params we need and user.token is the value
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}