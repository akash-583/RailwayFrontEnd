import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IssueService } from '../Services/issue.service';

@Component({
  selector: 'app-issuelist',
  templateUrl: './issuelist.component.html',
  styleUrls: ['./issuelist.component.css']
})
export class IssuelistComponent implements OnInit {
  formValue!: FormGroup;
  isRole: string | null = null;
  issue12:string|null=null;
  data: any;
  dataSource: any[] = [];
isPrint:boolean=false;
constructor(
  private issueServie: IssueService,
  private formBuilder: FormBuilder,
  private router : Router,
){
}

ngOnInit(): void {
  this.isRole = sessionStorage.getItem('role');
  this.getIssueList();

  this.formValue = this.formBuilder.group({
    issue: [''],
    status: [''], // Make sure 'status' is defined in your form group
    solution: [''],
  });
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
this.isPrint=true;
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

getIssueList(){
  if(this.isRole === 'Admin'){
  this.issueServie.getAllIssues().subscribe({
    next: (res) => {
      this.dataSource = res;
      console.log(this.dataSource+"******************************************")
    },
    error: console.error,
  });
}

else if(this.isRole === 'User'){
  this.issueServie.getUserissue().subscribe({
     next: (res) => {
        this.dataSource = res;
        console.log(res)
      },
      error: console.error,
  });
}
}

details(username: any){
  this.issueServie.getIssuesByUserName(username).subscribe({
    next: (res) => {
      this.data=res;
      // console.log("***************************************************")
      console.log(res)
    },
    error: console.error,
  });
} 
EditForm(issue: any) {
  this.formValue.controls['issue'].setValue(issue.issue);
  this.formValue.controls['status'].setValue(issue.status);
  this.formValue.controls['solution'].setValue(issue.solution);
  console.log(issue)
  sessionStorage.setItem('issue',issue);
}

updateIssue(){
  console.log(this.formValue.value.issue);
  this.issue12=this.formValue.value.issue;
  this.issueServie
  .updateIssue(this.formValue.value,this.issue12)
  .subscribe({
    next: (res) => {
      console.log(res);
      this.router.navigate(['/issuelist']);
    },
  });
  window.location.reload();
  this.getIssueList();
}
 
}
