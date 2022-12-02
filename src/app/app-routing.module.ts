import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { HomePageComponent } from "./home-page/home-page.component";
import { CreateFormComponent } from "./create-form/create-form.component";
import { FormDetailsComponent } from "./home-page/form-details/form-details.component";
import { DisplayFormComponent } from "./home-page/display-form/display-form.component";
import { FormResolverService } from "./shared/form-resolver.service";

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'new', component: CreateFormComponent },
  { path: 'forms-list/:id', component: FormDetailsComponent },
  { path: 'display/:id', component: DisplayFormComponent, resolve: [FormResolverService] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

// Add AppRoutingModule to app.module.ts imports array
export class AppRoutingModule {}