import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TrainListComponent } from './trainlist/trainlist.component';
import { IssueformComponent } from './issueform/issueform.component';
import { IssuelistComponent } from './issuelist/issuelist.component';
import { BookingformComponent } from './bookingform/bookingform.component';
import { PaymentComponent } from './payment/payment.component';
import { BookinglistComponent } from './bookinglist/bookinglist.component';
import { PaymentlistComponent } from './paymentlist/paymentlist.component';
import { UserlistComponent } from './userlist/userlist.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { ProfileComponent } from './profile/profile.component';
import { AddtrainComponent } from './addtrain/addtrain.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { LogoutComponent } from './logout/logout.component';
import { CancelComponent } from './cancel/cancel.component';
import { AuthGuard } from './routeguard/login.guard';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {path:'homepage',component:HomepageComponent},
  {path:'trainList',component:TrainListComponent,canActivate:[AuthGuard]},
  {path:'bookingform',component:BookingformComponent,canActivate:[AuthGuard]},
  {path:'adminlogin',component:AdminloginComponent,canActivate:[AuthGuard]},
  {path:'addtrain',component:AddtrainComponent,canActivate:[AuthGuard]},
  {path: 'paymentlist', component: PaymentlistComponent,canActivate:[AuthGuard]},
  {path: 'thankyou', component: ThankyouComponent,canActivate:[AuthGuard]},
  {path: 'logout', component: LogoutComponent},
  {path: 'profile', component: ProfileComponent,canActivate:[AuthGuard]},
  {path: 'cancel', component: CancelComponent,canActivate:[AuthGuard]},
  {path:'issueform',component:IssueformComponent,canActivate:[AuthGuard]},
  {path:'userlist',component:UserlistComponent,canActivate:[AuthGuard]},
  {path:'issuelist',component:IssuelistComponent,canActivate:[AuthGuard]},
  {path: 'payment', component: PaymentComponent,canActivate:[AuthGuard]},
  {path: 'bookinglist', component: BookinglistComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'error',component:ErrorComponent},
  {path:'register',component:RegisterComponent},
  {path:'',redirectTo:'homepage',pathMatch:'full'},
  {path:'**',redirectTo:'homepage',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
