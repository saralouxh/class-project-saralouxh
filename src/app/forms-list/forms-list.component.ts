import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirebaseService } from '../shared/firebase-service';
import { FormModel } from '../shared/form.model';
import { FormService } from '../shared/form.service';

@Component({
  selector: 'app-forms-list',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.css']
})
export class FormsListComponent implements OnInit {
  formsList: FormModel[] = [];

  constructor( private formService: FormService, private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.formsList = this.formService.getAllForms();

    this.formService.formListChanged.subscribe((updatedList: FormModel[]) => {
      this.formsList = updatedList;
    });

    console.log('formsList:', this.formsList);
  }

  onDeleteForm(id: string) {
    this.formService.deleteSingleForm(id);
  }

}
