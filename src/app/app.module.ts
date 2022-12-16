import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component'
import { FormDetailsComponent } from './forms-list/form-details/form-details.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsListComponent } from './forms-list/forms-list.component';
import { DisplayFormComponent } from './display-form/display-form.component';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { StartPageComponent } from './home-page/start-page/start-page.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FormDetailsComponent,
    CreateFormComponent,
    HomePageComponent,
    FormsListComponent,
    DisplayFormComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    SignUpComponent,
    LoginComponent,
    StartPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
