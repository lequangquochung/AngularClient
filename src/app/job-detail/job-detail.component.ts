import { Customer } from './../Models/customer.model';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material/';
import Swal from 'sweetalert2';
//
import { Job } from './../Models/job.model';
//service
import { JobService } from '../shared/job.service';
import { CustomerAccountService } from '../shared/customer-account.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  @Input() job: Job

  customer: Customer;

  ELEMENT_DATA: Customer[];
  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'gender',
    'address',
    'city',
    'email',
    'phone_number',
    'description',
    'imgUrl',
    'customer_id'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource = new MatTableDataSource<Customer>(this.ELEMENT_DATA);

  constructor(private route: ActivatedRoute,
    private location: Location,
    private jobService: JobService,
    private customerAccountService: CustomerAccountService) { }

  ngOnInit() {
    this.getJobById();
    this.getCustomerByJobId();

    this.dataSource.sort=this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getJobById(): void {
    // const customer_id = +this.route.snapshot.params.get('customer_id');
    const job_id = +this.route.snapshot.paramMap.get('job_id');
    console.log(`this.route.snapshot.paramMap = ${JSON.stringify(this.route.snapshot.paramMap)}`);
    this.jobService.getJobById(job_id).subscribe(job => this.job = job);
  }

  getCustomerByJobId() {
    const job_id = +this.route.snapshot.paramMap.get('job_id');
    // console.log(`this.route.snapshot.paramMap = ${JSON.stringify(this.route.snapshot.paramMap)}`);
    this.customerAccountService.getCustomerByJobId(job_id).subscribe(
      data => this.dataSource.data = data as unknown as Customer[]);
  }

  apllyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  




  deleteCustomer(customer_id) {
    this.cancel();
    this.customerAccountService.deleteCustomter(customer_id).subscribe();
  }

  cancel(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted!',
          'success'
        ),
          this.ngOnInit();
      }
    })
  }
  goBack() {
    this.location.back();
  }

}
