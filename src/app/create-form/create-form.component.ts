import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormService } from '../shared/form.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  constructor(private formService: FormService) { }

  ngOnInit(): void {
  }

  onSubmitForm(formObj: NgForm) {
    const { title, nursingTextArea, name, age, allergies, codeStatus, providerTextArea } = formObj.value;

    this.formService.saveSingleForm({ title, nursingTextArea, name, age, allergies, codeStatus, providerTextArea });

    console.log(formObj);
  }

}
