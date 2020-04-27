import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { from } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { Route,RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CustomerloginComponent } from './customerlogin/customerlogin.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { AlertService } from './services/alerts.service';
import { AuthenticationService } from './services/authentication-service';
import { AlertComponent } from './alert/alert.component';
import { TokenInterceptor } from './helper/token.interceptor';
import { ErrorInterceptor } from './helper/error.interceptor';
import { AuthGuard, RandomGuard } from './guard';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CommunityClassComponent } from './community-class/community-class.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ClassRegistrationComponent } from './class-registration/class-registration.component';
import { ListClassesComponent } from './list-classes/list-classes.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SampleTestComponent } from './sample-test/sample-test.component';





@NgModule({
  declarations: [
    AppComponent,
    CustomerRegistrationComponent,
    HomeComponent,
    PageNotFoundComponent,
    AppSettingsComponent,
    ProfileComponent,
    ContactComponent,
    AppHeaderComponent,
    AppFooterComponent,
    CoachProfileComponent,
    CustomerloginComponent,
    AlertComponent,
    CommunityClassComponent,
    ClassRegistrationComponent,
    ListClassesComponent,
    SampleTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatMenuModule,
    NgxMaterialTimepickerModule,
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  exports:[RouterModule,AppRoutingModule],
  providers: [
    AlertService,
    AuthenticationService,
    AuthGuard,
    RandomGuard,
    /*{ provide: HTTP_INTERCEPTORS,
       useClass: ErrorInterceptor,
        multi: true 
    },*/
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
