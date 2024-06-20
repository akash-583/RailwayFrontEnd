import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TrainService } from '../Services/train.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addtrain',
  templateUrl: './addtrain.component.html',
  styleUrls: ['./addtrain.component.css']
})
export class AddtrainComponent implements OnInit {

  trainForm: FormGroup;

  constructor(private fb: FormBuilder, private trainservice:TrainService,private router:Router) {
    this.trainForm = this.fb.group({
      trainNo: ['', [Validators.required, Validators.pattern('\\d{5}')]],
      trainName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      source: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      destination: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      fare: [0, [Validators.required, Validators.min(0), Validators.max(3000)]],
      seats: [0, [Validators.required, Validators.min(0), Validators.max(300)]],
      time: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
  }

  
  submitForm() {
    if (this.trainForm.valid) {
      // Submit the form data
      console.log(this.trainForm.value);
      this.trainservice.addTrain(this.trainForm.value).subscribe({
        next:(val:any)=>{
          console.log(val)
          // alert("Data Added Successfully")
          // window.location.reload();
        } 
      })
      console.log(this.trainForm.value);
      Swal.fire({
        icon: 'success',
        title: 'New Train Added',
        text: 'Train Data Updated Successfully!',
      })
      this.trainservice.getAllTrains();
      this.router.navigate(['/trainList']); 
    } else {
      // Handle validation errors
      Swal.fire({
        icon: 'error',
        text: 'Please Enter Valid Data',
      })
      console.log('Form contains validation errors.');
    }
  }

  goBack() {
     // Reload the page
  }
  reload(){
    window.location.reload();
  }

}
