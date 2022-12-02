import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormModel } from '../../shared/form.model';
import { FormService } from '../../shared/form.service';

@Component({
  selector: 'app-forms-list',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.css']
})
export class FormsListComponent implements OnInit {
  formsList: FormModel[] = [];

  constructor( private formService: FormService ) { }

  ngOnInit(): void {
    // this.firebaseService.fetchFormsInFirebase().subscribe(response => {
    //   this.formsList = response;
    //   console.log(this.formsList);
    // });
    this.formsList = this.formService.getFormsFromFirebase();
    this.formService.formListChanged.subscribe((updatedList: FormModel[]) => {
    this.formsList = updatedList;
    });

    console.log('formsList:', this.formsList);
  }

    // this.formsService.getFormsFromFirebase().subscribe(forms => {
    //   this.formsList = forms;
    // });

    onDeleteForm(id: string) {
      this.formService.deleteSingleForm(id);
    }

}
