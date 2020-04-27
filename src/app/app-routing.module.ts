import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { RandomGuard } from './guard/random.guard';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { HomeComponent } from './home/home.component';
import { CoachProfileComponent } from './coach-profile/coach-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CustomerloginComponent } from './customerlogin/customerlogin.component';
import { CommunityClassComponent } from './community-class/community-class.component';
import { ClassRegistrationComponent } from './class-registration/class-registration.component';
import { SampleTestComponent } from './sample-test/sample-test.component';

const routes: Route[] = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',
  component:HomeComponent,
  canActivate: [AuthGuard]
},
  {path:'settings',component:AppSettingsComponent,
    children:[
      {path:'profile',
        component:ProfileComponent
      },
      {path:'contacts',
      component:ContactComponent
      }
  ]
  },
  {path:'register',
  component:CustomerRegistrationComponent
  },
  {path:'login',
  component:CustomerloginComponent
  },
  {path:'profile',
  component:ProfileComponent
  },
  {path:'coach',
  component:CoachProfileComponent,
  canActivate: [AuthGuard]
  },
  {path:'class',
  component:CommunityClassComponent,
  canActivate: [AuthGuard]
  },
  {path:'classreg',
  component:ClassRegistrationComponent,
  canActivate: [AuthGuard]
  },
  {path:'sample',
  component:SampleTestComponent,
  canActivate: [AuthGuard]
  },
  {path:'**',
  component:PageNotFoundComponent
}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }