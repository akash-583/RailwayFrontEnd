import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../Services/booking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bookinglist',
  templateUrl: './bookinglist.component.html',
  styleUrls: ['./bookinglist.component.css']
})
export class BookinglistComponent implements OnInit {

  isRole: string | null = null;
space="         ";
  dataSource: any[] = [];

  data: any;
isPrint:boolean=false;

  constructor(
    private bookingService: BookingService,
    private router: Router
    ){}
    printDiv(divName: any): void {
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
  const imageHTML = '<img src="/assets/download.png" alt="Image Description" style="height: 100px;width: 100px;margin-left: 10px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
 const line="<h2 class='text-center'><b>Indian Railways</b></h2>";
 const line3="<h5 class='text-center'><b>Ticket Details</b></h5>";
 const line2="<br>";
  // Get the original content of the element with ID 'divName'
  const originalContents = document.getElementById(divName)?.innerHTML;

  if (!originalContents) {
    console.error(`Element with ID '${divName}' not found.`);
    return;
  }

  // Combine the image HTML and the original content
  const printContents = line2+imageHTML +line+line2+line3+originalContents;
  const printPageWithBorder = `<div style="border: 1px solid #000;">${printContents}</div>`;
  document.body.innerHTML = printPageWithBorder;

  window.print();

  // Restore the original content and reload the page
  document.body.innerHTML = originalContents;
  window.location.reload();
    }
    
  ngOnInit(): void {
    this.getBookingList();
    this.isRole = sessionStorage.getItem('role');
    this.getBookingList();
    let ref=document.getElementById('cancel')
        ref?.click();
  }

  getBookingList() {
    if(this.isRole === 'Admin'){
    this.bookingService.getAllBookings().subscribe({
      next: (res) => {
        this.dataSource = res;
        // console.log("***************************************************")
        console.log(res)
      },
      error: console.error,
    });
  }
  else if(this.isRole === 'User'){
    this.bookingService.viewByUserName().subscribe({
      next: (res) => {
        this.dataSource = res;
        // console.log("***************************************************")
        console.log(res)
      },
      error: console.error,
    });
  }
  }
printPage(divName: any): void {
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

  cancelTicket(pnr: any) {
    Swal.fire({
      icon: 'success',
      title: 'Delete Successfully',
      text: 'Train ticket deleted successfully.',
    }).then(() => {
      window.location.reload();
    });
    this.bookingService.cancelTicket(pnr).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
    this.getBookingList();
  } 

  details(pnr: any){
    this.bookingService.getDetails(pnr).subscribe({
      next: (res) => {
        this.data=res;
        // console.log("***************************************************")
        console.log(res)
      },
      error: console.error,
    });
  }

  payment(Cost: any){
    sessionStorage.setItem('cost',Cost);
    this.router.navigate(['/payment']);
  }
 
}
