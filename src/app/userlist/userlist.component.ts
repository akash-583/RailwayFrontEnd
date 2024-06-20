import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  dataSource: any[] = [];
  isRole: string | null = null;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isRole = sessionStorage.getItem('role');
    this.getUserList();
  }

  getUserList() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.dataSource = res;
        console.log(res);
      },
      error: console.error
    });
  }
printPage()
{
  window.print();
}
printPage1(divName: any): void {
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
}
