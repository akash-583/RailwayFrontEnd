import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../Services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  updateForm!:FormGroup;
  username=sessionStorage.getItem('username');
  gender=sessionStorage.getItem('gender');
  datasource: any[]=[];
  data:any;

  constructor(private profileService:ProfileService,
          private router:Router,
          private formBuilder:FormBuilder,
    ) { }

 
  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      username:[this.username],
      role:['User'],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      country: ['', Validators.required]
    });
    this.newmethod();
  }

  submitForm()
  {
    if (this.updateForm.valid) {
      this.profileService.updateProfile(this.updateForm.value,).subscribe({
        
        next:(res)=>
        {
        },
        
      });
      Swal.fire({
        icon: 'success',
        title: 'Updated Successful',
        text: 'Profile updated successfully!',
      }).then(() => {
        this.router.navigate(['/homepage']);
      });
    }

    else{
      console.log('Form contains validation errors.');
      alert("Please Provide Valid Data")
    }
  }
  

  reload()
  {
    window.location.reload();
  }



  newmethod()
  {
    this.profileService.showuserdetails(this.username).subscribe({
      next:(res:any)=>
      {
        this.data=res;
        console.log(res);
        this.updateForm.patchValue({
          email: res.email,
          age: res.age,
          gender:res.gender,
          country:res.country
        });
      }
    })
  }


 
}
