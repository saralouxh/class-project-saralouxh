import { Component, OnInit, Input} from '@angular/core';

import { FormModel } from 'src/app/shared/form.model';
import { FormService } from '../../shared/form.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.css'],
  providers: [DatePipe],
})
export class FormDetailsComponent implements OnInit {
  // Make sure to import the FormModel
  // Bind to form in the forms-list.component.html on the <app-form-details> elememt selector
  @Input() formData: FormModel;
  formattedCreationDate = null;

  constructor( private formService: FormService, private datePipe: DatePipe ) { }

  ngOnInit(): void {
    const currentDate = new Date();
    this.formattedCreationDate = this.datePipe.transform(currentDate, 'MM/dd/yyyy');
  }

}
