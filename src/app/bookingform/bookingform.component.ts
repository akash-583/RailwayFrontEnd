import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from '../Services/booking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bookingform',
  templateUrl: './bookingform.component.html',
  styleUrls: ['./bookingform.component.css']
})
export class BookingformComponent implements OnInit {

  bookingForm!: FormGroup;
  pnr: any;

  constructor(
    private fb: FormBuilder, 
    private bookingService: BookingService,
    private router : Router,
    ) {
      
    }
  
  trainNo = sessionStorage.getItem('trainNo');
  source = sessionStorage.getItem('source');
  
  Fare: any = sessionStorage.getItem('fare');
  numberOfTickets: number = 1;  
  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      trainNo: [this.trainNo, [Validators.required]],
      Fare: [this.Fare],
      source:[this.source],
      phnnumber: ['', [Validators.required, Validators.pattern('\\d{10}')]],
      email: ['', [Validators.required, Validators.email]],
      numberOfTickets: [1, [Validators.required, Validators.min(1), Validators.max(6)]],
    });
    console.log(this.source);
  }

  submitForm() {
    if (this.bookingForm.valid) {
      // Form is valid, you can submit it here
      this.bookingService.bookTicket(this.bookingForm.value).subscribe({
       next:(val:any)=>{
        console.log(val.pnr);
        sessionStorage.setItem('pnr',val.pnr);

       },
       error:(val:any)=>{
        this.pnr = val;
        console.log(val?.error?.text+"******************");
       }
      })
      Swal.fire({
        icon: 'success',
        title: 'Booking Successfully',
        text: 'Please proceed to make the payment.So that you can confirm your booking.',
      })
      console.log(this.bookingForm.value);

      const totalCost = this.Fare*(this.bookingForm.get('numberOfTickets')?.value || 1);
      sessionStorage.setItem('totalCost', totalCost.toString());

      sessionStorage.setItem('email',this.bookingForm.get('email')?.value);
      
      this.router.navigate(['/payment'], 
      {
      }
      );
    } 
    else {
      // Form contains validation errors
      Swal.fire({
        icon: 'error',
        text: 'Please Enter Valid Data',
      })
      console.log('Form contains validation errors.');
    }
    
  }


  


}
