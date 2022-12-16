import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/firebase-service';
import { FormModel } from '../shared/form.model';
import { FormService } from '../shared/form.service';

@Component({
  selector: 'app-display-form',
  templateUrl: './display-form.component.html',
  styleUrls: ['./display-form.component.css']
})
export class DisplayFormComponent implements OnInit {
  @Input() formData: FormModel;
  id: string;

  // we need to retrieve a single form, we get the id from the router so make sure to inject the activated route
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: FormService
  ) { }

  ngOnInit() {
    if (!this.formData) {
      this.route.params.subscribe((newParams: Params) => {
        this.formData = this.formService.getSingleForm(newParams.id);
        console.log(this.formData);
      })
    }
    // this.route.params.subscribe((params: Params) => {
    //   this.id = params['id'];
    //   this.formData = this.formService.getSingleForm(this.id);
    //   console.log(this.formData);
    // });
  }

  onDeleteForm(id: string) {
    this.formService.deleteSingleForm(id);
    this.router.navigate(['/home']);
  }

}
