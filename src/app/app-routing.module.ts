import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { HomePageComponent } from "./home-page/home-page.component";
import { CreateFormComponent } from "./create-form/create-form.component";
import { FormDetailsComponent } from "./forms-list/form-details/form-details.component";
import { DisplayFormComponent } from "./display-form/display-form.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { LoginComponent } from "./auth/login/login.component";
import { AuthGuard } from "./auth/auth.guard";
import { StartPageComponent } from "./home-page/start-page/start-page.component";
// import { ResolverService } from "./shared/resolver.service";

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'new', component: CreateFormComponent },
  { path: 'form-details/:id', component: FormDetailsComponent },
  { path: 'display/:id', component: DisplayFormComponent },
  { path: 'start', component: StartPageComponent},
  { path: 'sign-up', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

// Add AppRoutingModule to app.module.ts imports array
export class AppRoutingModule {}