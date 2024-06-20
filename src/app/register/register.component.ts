import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterserviceService } from '../Services/registerservice.service';
import { UserService } from '../Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  signupForm: FormGroup;
  addUserErrorMessage: any;

  constructor(private formBuilder: FormBuilder,private registerService:RegisterserviceService,private router: Router,private userService:UserService) {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,20}$/)
    ]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*()_+])[A-Za-z\d@#$!%^&*()_+]{8,}$/)
        ]
      ],
      role: ['', Validators.required],
      // role: ['User', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      country: ['', Validators.required]
    });
  }
  ngOnInit(): void {
  }
  submitForm() {
    if (this.signupForm.valid) {
      // Submit the form data
      console.log(this.signupForm.value);
      this.registerService.signupUser(this.signupForm.value).subscribe({
        next:(val:any)=>{
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: 'Your registration has been completed successfully!',
          })          // window.location.reload(); // Reload the page
          this.router.navigate(['/login']); 
        },
        error:(val:any)=>
        {
          this.addUserErrorMessage=val;
          // this.addUserErrorMessage=val.error.message;
          window.scrollTo(0,0);
          // console.log(val.e);
          // alert(val.error.message);
        }
      })
    } else {
      // Handle validation errors
      console.log('Form contains validation errors.');
      alert("Please Provide Valid Data")
    }
  }
  goBack() {
    window.location.reload(); // Reload the page
  }

}
