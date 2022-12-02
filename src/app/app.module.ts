import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component'
import { FormDetailsComponent } from './home-page/form-details/form-details.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsListComponent } from './home-page/forms-list/forms-list.component';
import { DisplayFormComponent } from './home-page/display-form/display-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FormDetailsComponent,
    CreateFormComponent,
    HomePageComponent,
    FormsListComponent,
    DisplayFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
