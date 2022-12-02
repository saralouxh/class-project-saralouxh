import { Component, OnInit, Input} from '@angular/core';

import { FormModel } from 'src/app/shared/form.model';
import { FormService } from '../../shared/form.service';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.css']
})
export class FormDetailsComponent implements OnInit {
  // Make sure to import the FormModel
  // Bind to formData in the saved-forms.component.html on the <app-form-details> elememt selector
  @Input() formData: FormModel;

  constructor( private formService: FormService ) { }

  ngOnInit(): void {
  }

 
}
