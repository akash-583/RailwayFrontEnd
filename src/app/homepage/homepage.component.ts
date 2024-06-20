import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TrainService } from '../Services/train.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  search!: FormGroup;
  noTrainsFoundMessage: string = ''; // Initialize it with an empty string
  isLoggedIn: boolean = false;
  isRole: string | null = null;
 
  datasource: any[]=[];
  constructor(private trainService:TrainService,
          private router:Router,
          private formbuilder:FormBuilder
    ) { }
 
    ngOnInit():void{
      const loggedInValue = sessionStorage.getItem('loggedIn');
      this.isLoggedIn = loggedInValue === 'true';
    this.isRole = sessionStorage.getItem('role');

      this.search=this.formbuilder.group({
        source: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
          ],
        ],
        destination: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
          ],
        ]
      });}

     
      searchTrains()
      {
        this.trainService.findByLocation(this.search.value.source,this.search.value.destination).subscribe
          ({
            next:(val:any)=>{
              this.datasource=val;
              console.log(this.search.value.source);
              console.log(this.search.value.destination);
              
              if(this.datasource.length===0)
              {
                  this.noTrainsFoundMessage="No trains were found";
              }
            },
            
            error:console.error,
          });
      }
      redirectToBookingOrLogin(data: any) {
        if (this.isLoggedIn) {
          // If logged in, check their role
          sessionStorage.setItem('trainNo', data.trainNo);
          sessionStorage.setItem('fare', data.fare);
          console.log(data.trainNo)
          if (this.isRole === 'User') {
            

            // Redirect regular user to booking page
            // this.router.navigate(['/bookingform']);
            window.location.href="http://localhost:4200/bookingform";
          }
          
        } else {
          // If not logged in, redirect to login page
          Swal.fire({
            icon: 'error',
            title: 'Not Logged In',
            text: 'Please login to your account.So that you can buy your ticket.',
          }).then(() => {
                       window.location.href="http://localhost:4200/login";

          });
        }
      }

}
