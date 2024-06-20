import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;
  isRole: string | null = null; // Initialize isRole as a string or null
  
  formValue!: FormGroup;
  username = sessionStorage.getItem('username');

  constructor(private router: Router, private formbuilder: FormBuilder,
    private signinService : LoginService) { }

  ngOnInit(): void {
    const loggedInValue = sessionStorage.getItem('loggedIn');
    this.isLoggedIn = loggedInValue === 'true';
    this.isRole = sessionStorage.getItem('role');

    this.formValue = this.formbuilder.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*()_+])[A-Za-z\d@#$!%^&*()_+]{8,}$/)
        ]
      ],
    })
  }
  handleLogout(): void {
    // Handle the logout action here, e.g., clear sessionStorage and navigate to the login page
   // Update the logged-in status
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      allowOutsideClick: false,
    }).then((result:any) => {
      if (result.isConfirmed) {
        // Handle the logout action here
        // You can redirect the user to the logout URL or perform other actions
        // For example, window.location.href = '/logout';
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('role');
        this.isLoggedIn = false; 
        sessionStorage.clear();
        this.router.navigate(['/logout']);
      }
      else{
        if(this.isRole==='User'){
        this.router.navigate(['/homepage']);
        }else{
          this.router.navigate(['/adminlogin']);

        }
      }
    });
  }

  updatepassword(){
    console.log(this.formValue.value)
    this.signinService
    .updatePassword(this.formValue.value)
    .subscribe({
      next: (res) => {
        console.log(res);
      },
    });
    Swal.fire({
      icon: 'success',
      title: 'Updated Successful',
      text: 'Password Updated sucessfully!',
    }).then(()=>{
     window.location.reload();
  })
  }
}
