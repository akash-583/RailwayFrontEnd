import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { UserService } from '../Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinUser: FormGroup;
  dataSource: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private loginservice: LoginService,
    private router: Router,private userService:UserService
  ) {
    this.signinUser = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
  }
  submitForm() {
    if (this.signinUser.valid) {
      // Submit the form data
      this.loginservice.signinUser(this.signinUser.value).subscribe({
        next: (val: any) => {
          // alert('Login Successfully');
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
          })
          sessionStorage.setItem('loggedIn', 'true');
          sessionStorage.setItem('role', val.roles[0]); // Access the roles array
          sessionStorage.setItem('token', val.accessToken);
          sessionStorage.setItem('username',val.username);
          if(sessionStorage.getItem('role') === 'Admin'){
            this.router.navigate(['/adminlogin']);
            }
            else if(sessionStorage.getItem('role') === 'User'){
              this.router.navigate(['/homepage']);
              }
        },
        error: (error) => {
          console.error('Error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid Username and Password!',
          })        },
      });
    } else {
      // Handle validation errors
      alert('Please Enter Valid Data');
      console.log('Form contains validation errors.');
    }
  }
  getUserList() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.dataSource = res;
      },
      error: console.error
    });
  }
  goBack() {
    this.router.navigate(['/homepage']); // Reload the page
  }

}
