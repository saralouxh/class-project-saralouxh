// Import service into provider array in app.module.ts
import { Subject } from "rxjs";
import { EventEmitter, Injectable } from "@angular/core";
import { FirebaseService } from "./firebase-service";
import { FormModel } from "./form.model";
import { Form } from "@angular/forms";
import { objectToArray } from "src/utils/objectToArray";

@Injectable({
  providedIn: 'root'
})

export class FormService {
  // Emitters/Subjects
  formSelected = new Subject<FormModel>();
  formAdded = new Subject<FormModel>();
  formListChanged = new Subject<FormModel[]>();

  // Data
  private allForms: FormModel[] = [];

  constructor(private firebaseService: FirebaseService) {}

  // Get Forms From Firebase
  getFormsFromFirebase(): any {
    return this.firebaseService.fetchFormsInFirebase().subscribe((res: any) => {
      if (res) {
        const arrayOfForms = objectToArray(res);
        this.allForms = arrayOfForms;
        this.formListChanged.next(this.allForms);
      }
    });
  }

  // Get All Forms
  getAllForms() {
    this.getFormsFromFirebase();
    console.log('allForms', this.allForms);
    return this.allForms.slice();
  }

  getSingleForm(id: string) {
    const form = this.allForms.slice().find((form) => form.id === id);
    return form;
  }

  saveSingleForm(formData: FormModel) {
    this.firebaseService.saveFormToFirebase(formData);

    this.allForms.push({ ...formData });

    this.formAdded.next({ ...formData });

    this.formListChanged.next(this.allForms.slice());
  }

  deleteSingleForm(id: string) {
    this.firebaseService.deleteFormInFirebase(id);

    this.allForms = this.allForms.filter((form) => form.id !== id);

    this.formListChanged.next(this.allForms.slice());
  }
}

