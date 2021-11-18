import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AuthenticationComponent } from './authentication/authentication.component';



import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { APIChartComponent } from './apichart/apichart.component';

const routes: Routes = [

  { path: '',   redirectTo: '/', pathMatch: 'full' },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
   { path: 'logout', component: LogoutComponent }, 
   { path: 'apichart', component: APIChartComponent }
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
