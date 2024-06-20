import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../Services/payment.service';

@Component({
  selector: 'app-paymentlist',
  templateUrl: './paymentlist.component.html',
  styleUrls: ['./paymentlist.component.css']
})
export class PaymentlistComponent implements OnInit {
  isLoggedIn:boolean=false;
  // neww:string;
  isRole: string | null = null;
  dataSource:any[]=[];
  constructor(
    private paymentService: PaymentService,
    private router: Router,
  ) {
    // this.neww="";
  }
  ngOnInit(): void {
    const loggedInValue = sessionStorage.getItem('loggedIn');
    this.isRole = sessionStorage.getItem('role');
    this.isLoggedIn = loggedInValue === 'true';
    this.getAllPayments();
  }

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
  printPage()
  {
    window.print();
  }
  printPage1(divName: any): void {
    // let printContents = document.getElementById(divName)?.innerHTML;
    // if (!printContents) {
    //   console.error(`Element with ID '${divName}' not found.`);
    //   return;
    // }
    // printContents += '<img src="/assets/download.png" alt="Image Description">';
    // const originalContents = document.body.innerHTML;
  
    // document.body.innerHTML = printContents;
   
    // window.print();
  
    // document.body.innerHTML = originalContents;
    // window.location.reload();
  
  // Get the original content of the element with ID 'divName'
  const originalContents = document.getElementById(divName)?.innerHTML;
  
  if (!originalContents) {
  console.error(`Element with ID '${divName}' not found.`);
  return;
  }
  
  // Combine the image HTML and the original content
  const printContents = originalContents;
  const printPageWithBorder = `<div style="border: 1px solid #000;">${printContents}</div>`;
  document.body.innerHTML = printPageWithBorder;
  
  window.print();
  
  // Restore the original content and reload the page
  document.body.innerHTML = originalContents;
  window.location.reload();
  }
}
