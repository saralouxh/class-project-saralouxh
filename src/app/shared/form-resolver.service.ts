import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { FirebaseService } from "./firebase-service";
import { FormModel } from "./form.model";
import { FormService } from "./form.service";

@Injectable({providedIn: 'root'})
export class FormResolverService implements Resolve<FormModel[]> {

  constructor(
    private firebaseService: FirebaseService,
    private formService: FormService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const forms = this.formService.getFormsFromFirebase();

    if (forms) {
      return this.firebaseService.fetchFormsInFirebase();
    } else {
      return forms;
    }

  }
}