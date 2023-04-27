// Make sure to import HttpClientModule to app.module.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FormModel } from './form.model';
import { FIREBASE_FORMS } from 'src/constants/firebase-root';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  fetchFormsInFirebase() {
    return this.http.get(FIREBASE_FORMS + ".json");
  }

  saveFormToFirebase(formData: FormModel) {
    this.http.post(FIREBASE_FORMS + '.json', formData)
    .subscribe(response => {
      console.log(response);
    });
  }

  deleteFormInFirebase(formId: string) {
    this.http.delete(FIREBASE_FORMS + '/' + formId + '.json').subscribe();
  }
}