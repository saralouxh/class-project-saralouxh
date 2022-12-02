import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FirebaseService } from 'src/app/shared/firebase-service';
import { FormModel } from '../../shared/form.model';
import { FormService } from '../../shared/form.service';

@Component({
  selector: 'app-display-form',
  templateUrl: './display-form.component.html',
  styleUrls: ['./display-form.component.css']
})
export class DisplayFormComponent implements OnInit {
  formData: FormModel;
  id: string;

  // we need to retrieve a single form, we get the id from the router so make sure to inject the activated route
  constructor(
    private route: ActivatedRoute,
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.formData = this.formService.getSingleForm(this.id);
      console.log(this.formData);
    });
  }

}
