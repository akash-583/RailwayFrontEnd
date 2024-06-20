import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../Services/payment.service';
declare var Razorpay: any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  isLoggedIn:boolean=false;
  isRole: string | null = null;
  pnr: string | null = null;

cost = sessionStorage.getItem('totalCost');
username = sessionStorage.getItem('username');
email=sessionStorage.getItem('email');

constructor(private router : Router,private paymentService:PaymentService){

}
ngOnInit(): void {
  const loggedInValue = sessionStorage.getItem('loggedIn');
  this.isRole = sessionStorage.getItem('role');
  this.isLoggedIn = loggedInValue === 'true';

  this.getAllPayments();
}
dataSource:any[]=[];

getAllPayments()
{
  // if(this.isLoggedIn){
  //   if(this.isRole === 'Admin'){
  
  this.paymentService.getPaymentList().subscribe({
    next:(res)=>{
      this.dataSource=res;
    },
    error:console.error,
  });
//   }
// }
}

payNow() {
  const RozarpayOptions = {
    description: 'Sample Razorpay demo',
    currency: 'INR',
    email: this.email,
    amount: (Number(this.cost) || 0) * 100,
    name: this.username,
    key: 'rzp_test_Tnw3WSxg924MCt',
    image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    prefill: {
      name: this.username,
       email: this.email,
    },
    theme: {
      color: '#06227e',
    },
    modal: {
    
      ondismiss:  () => {
        console.log('dismissed');
        this.pnr=sessionStorage.getItem('pnr');
        this.paymentService.updatePayment(this.pnr,"Payment Cancelled").subscribe({
          next: (res) => {
            console.log(res);
          },
        });
        this.router.navigate(['/cancel']);
      }
    }
    
  }

  const successCallback = (paymentid: any) => {
    console.log('Success Callback:', paymentid);
    alert('Payment is done');

  };
  
  // this.router.navigate(['/bookingList']);

  this.router.navigate(['/thankyou']);

  const failureCallback = (e: any) => {
    console.log('Failure Callback:', e);
    alert('Try it again');
  };
  

  Razorpay.open(RozarpayOptions,successCallback, failureCallback)
}
}
