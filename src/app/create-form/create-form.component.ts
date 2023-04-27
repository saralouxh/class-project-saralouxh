import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../shared/form.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {
  createForm: FormGroup;

  constructor(
    private formService: FormService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.createForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      nursingTextArea: new FormControl(null),
      name: new FormControl(null),
      age: new FormControl(null),
      allergies: new FormControl(null),
      codeStatus: new FormControl(null),
      providerTextArea: new FormControl(null),
      vitals: new FormControl(null),
      temperature: new FormControl(null),
      otherTextArea: new FormControl(null)
    });
  }

  onSubmitForm() {
    const { title, nursingTextArea, name, age, allergies, codeStatus, providerTextArea, vitals, temperature, otherTextArea } = this.createForm.value;

    this.formService.saveSingleForm({ title, nursingTextArea, name, age, allergies, codeStatus, providerTextArea, vitals, temperature, otherTextArea });

    console.log(this.createForm);

    this.onReset();

    this.router.navigate(['/home']);
  }

  onReset() {
    this.createForm.reset();

    this.router.navigate(['./'], {relativeTo: this.route});
  }

}
