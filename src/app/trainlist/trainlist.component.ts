import { Component, OnInit } from '@angular/core';
import { TrainService } from 'src/app/Services/train.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-train-list',
  templateUrl: './trainlist.component.html',
  styleUrls: ['./trainlist.component.css'],
})
export class TrainListComponent implements OnInit {
  formValue!: FormGroup;
  isLoggedIn: boolean = false;
  isRole: string | null = null;

  dataSource: any[] = [];
  dataSource1: any[] = [];
  constructor(
    private trainService: TrainService,
    private router: Router,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getTrainList();
    this.trainService.getAllTrains();

    const loggedInValue = sessionStorage.getItem('loggedIn');
    this.isLoggedIn = loggedInValue === 'true';
    this.isRole = sessionStorage.getItem('role');
    this.formValue = this.formbuilder.group({
      trainNo: ['', [Validators.required, Validators.pattern('\\d{5}')]],
      trainName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
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
      ],
      fare: [0, [Validators.required, Validators.min(0), Validators.max(3000)]],
      seats: [0, [Validators.required, Validators.min(0), Validators.max(300)]],
      time: ['', [Validators.required]],
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource = this.dataSource.filter((row) => {
      return (
        row.trainNo.toLowerCase().includes(filterValue) ||
        row.trainName.toLowerCase().includes(filterValue) ||
        row.source.toLowerCase().includes(filterValue) ||
        row.destination.toLowerCase().includes(filterValue)
      );
    });

    if (!filterValue || filterValue === '') {
      this.getTrainList();
    }
  }

  getTrainList() {
    this.trainService.getAllTrains().subscribe({
      next: (res) => {
        this.dataSource = res;
      },
      error: console.error,
    });
  }
  getTrainList1() {
    this.trainService.getAllTrains().subscribe({
      next: (res) => {
        this.dataSource1 = res;
      },
      error: console.error,
    });
  }

  deleteTrain(trainNo: any) {
    console.log('Deleting train with trainNo: ', trainNo);

    this.trainService.deleteTrain(trainNo).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
    Swal.fire({
      icon: 'success',
      title: 'Deleted Successful',
      text: 'Train deleted successfully!',
    }).then((result:any) => {
      window.location.reload();
      })
  this.trainService.getAllTrains();
  
  }

  EditForm(data: any) {
    this.formValue.controls['trainNo'].setValue(data.trainNo);
    this.formValue.controls['trainName'].setValue(data.trainName);
    this.formValue.controls['source'].setValue(data.source);
    this.formValue.controls['destination'].setValue(data.destination);
    this.formValue.controls['fare'].setValue(data.fare);
    this.formValue.controls['seats'].setValue(data.seats);
    this.formValue.controls['time'].setValue(data.time);
    console.log(this.formValue.value.trainNo);
    sessionStorage.setItem('trainNo', this.formValue.value.trainNo);
  }

  redirectToBookingOrLogin(data: any) {
    if (this.isLoggedIn) {
      // If logged in, check their role
      sessionStorage.setItem('trainNo', data.trainNo);
      sessionStorage.setItem('fare', data.fare);
      console.log(data.trainNo)
      if (this.isRole === 'User') {
        // Redirect regular user to booking page
        this.router.navigate(['/bookingform']);
       
      }
    } else {
      // If not logged in, redirect to login page
      alert("please login after that you can able to book a ticket")
      this.router.navigate(['/login']);
    }
  }
  updateTrain() {
    console.log(this.formValue.value)
    this.trainService
      .updateTrain(this.formValue.value.trainNo, this.formValue.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/trainList']);
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'Update Successful',
        text: 'Train Info Updated Successfully!',
      }).then(() => {
        window.location.reload();
      });
      this.getTrainList();
  }
  onSubmit() {
    this.router.navigate(['/trainList']);
    this.getTrainList();
  }
}
