import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { from } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { Route,RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CustomerloginComponent } from './customerlogin/customerlogin.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactComponent } from './contact/contact.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { CoachProfileComponent } from './coach-profile/coach-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule, MatInputModule, MatButtonModule} from '@angular/material';
import { AlertService } from './alerts.service';
import { AuthenticationService } from './authentication-service';

const routes: Route[] = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'settings',component:AppSettingsComponent,
    children:[
      {path:'profile',component:ProfileComponent},
      {path:'contacts',component:ContactComponent}
  ]
  },
  {path:'register',component:CustomerRegistrationComponent},
  {path:'login',component:CustomerloginComponent},
  {path:'coach',component:CoachProfileComponent},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CustomerloginComponent,
    CustomerRegistrationComponent,
    HomeComponent,
    PageNotFoundComponent,
    AppSettingsComponent,
    ProfileComponent,
    ContactComponent,
    AppHeaderComponent,
    AppFooterComponent,
    CoachProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  exports:[RouterModule],
  providers: [AlertService,AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
