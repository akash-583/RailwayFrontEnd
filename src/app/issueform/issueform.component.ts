import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IssueService } from '../Services/issue.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issueform',
  templateUrl: './issueform.component.html',
  styleUrls: ['./issueform.component.css']
})
export class IssueformComponent implements OnInit {

  issueForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private issueService: IssueService,
    private router:Router
    ) {}

  ngOnInit() {
    this.issueForm = this.formBuilder.group({
      issue: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(250)]],
      status: ['New'], // Auto-populated with "New"
    });
  }

  submitForm() {
    if (this.issueForm.valid) {
      // Submit the form data
      console.log(this.issueForm.value);
      this.issueService.addissue(this.issueForm.value).subscribe({
        next:(val:any)=>{
          console.log(val)
          sessionStorage.setItem('issue',val.issue);
          //sessionStorage.setItem('issue',this.issueForm.value.issue);
        }
      })
      console.log(this.issueForm.value)
      Swal.fire({
        icon: 'success',
        title: 'Issue Successfully',
        text: 'Issue added successfully!!',
      }).then(() => {
        this.router.navigate(['/homepage']);
      });
    } else {
      // Handle validation errors
      alert("Please Enter the Data")
      console.log('Form contains validation errors.');
    }
    this.issueForm.reset();
  }

  goBack() {
    window.location.reload(); // Reload the page
  }

}
