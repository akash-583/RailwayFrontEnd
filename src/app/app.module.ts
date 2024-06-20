import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TrainListComponent } from './trainlist/trainlist.component';
import { SearchTrainComponent } from './search-train/search-train.component';
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
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    RegisterComponent,
    LoginComponent,
    TrainListComponent,
    SearchTrainComponent,
    IssueformComponent,
    IssuelistComponent,
    BookingformComponent,
    PaymentComponent,
    BookinglistComponent,
    PaymentlistComponent,
    UserlistComponent,
    AdminloginComponent,
    ProfileComponent,
    AddtrainComponent,
    ThankyouComponent,
    LogoutComponent,
    CancelComponent,
    ErrorComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxExtendedPdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
