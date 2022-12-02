// Make sure to import HttpClientModule to app.module.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FormModel } from './form.model';
import { FIREBASE_FORMS } from 'src/constants/firebase-root';
import { FormService } from './form.service';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor(
    private http: HttpClient
  ) {}

  // Get requests have no second argument because you're not sending any data, just requesting data
  fetchFormsInFirebase(): any {
    // Don't forget to return here
    return this.http.get<{ [key: string]: FormModel }>(FIREBASE_FORMS + ".json")
      // Call pipe before the subscribe method to transform observable data
      .pipe(map(responseData => {
        // To convert the JS object to an array we have to manually loop through all the keys and create a new array: forms = []
        let forms: FormModel[] = [];
        // Use "for in" loop to go through all your keys in responseData(which will be an object)
        // then push each piece of data into "forms"
        for (let key in responseData) {
          forms.push({...responseData[key], id: key});
        }
        // Return "forms" array inside map so it is forwarded to our subscribe function
        return forms;
      }));
      // .subscribe((responseData) => {
      //   console.log(responseData);
      // });
  }

  // fetchFormsFromFirebase() {
  //   this.http.get<FormModel[]>(FIREBASE_FORMS + '.json')
  //   .pipe(map(forms => {
  //     return forms.map(form => {
  //       return {...form}
  //     });
  //   })).subscribe(forms => {
  //     this.formService.setForms(forms);
  //   });
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

  // getFormBbyId(id: string) {
  //   return this.http.get(FIREBASE_FORMS + id + '.json')
  // }
}