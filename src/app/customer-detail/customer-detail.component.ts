import { Customer } from './../Models/customer.model';
import { CustomerAccountService } from './../shared/customer-account.service';
import { Component, OnInit, Input,ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
//model
import { Job } from './../Models/job.model';

//services
import { JobService } from './../shared/job.service';



@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {  
  @Input() customer: Customer
  // customer: Customer;
  constructor(  private route: ActivatedRoute,
                private location: Location,
                private customerAccountService: CustomerAccountService,
                private jobService: JobService) { }

  ngOnInit() {
    this.getCustomerById();
  }

  getCustomerById(): void {
    // const customer_id = +this.route.snapshot.params.get('customer_id');
    const customer_id = +this.route.snapshot.paramMap.get('customer_id');
    console.log(`this.route.snapshot.paramMap = ${JSON.stringify(this.route.snapshot.paramMap)}`);
    this.customerAccountService.getCustomerById(customer_id).subscribe(customer => this.customer = customer);       
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
  goBack(): void {
    this.location.back();
  }


}
