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

  // // Get requests have no second argument because you're not sending any data, just requesting data
  // fetchFormsInFire() {
  //   // return http request where we get our forms inside of exhaustMap, then this entire observable chain now switches to this http observable
  //   return this.http.get<{ [key: string]: FormModel }>(
  //     FIREBASE_FORMS + ".json"
  //   )
  //   .pipe(
  //     map(responseData => {
  //       // To convert the JS object to an array we have to manually loop through all the keys and create a new array: forms = []
  //       const forms: FormModel[]= [];
  //       // Use "for in" loop to go through all your keys in responseData(which will be an object)
  //       // then push each piece of data into "forms"
  //       for (const key in responseData) {
  //         if(responseData.hasOwnProperty(key)){
  //           forms.push( {...responseData[key], id: key} );
  //         }
  //       }
  //       // Return "forms" array inside map so it is forwarded to our subscribe function
  //       return forms;
  //     })
  //   );
  // }

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