import { Job } from './../Models/job.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
//
import { Customer } from '../Models/customer.model';
//service
import { CustomerAccountService } from '../shared/customer-account.service';



@Component({
  selector: 'app-customer-account-list',
  templateUrl: './customer-account-list.component.html',
  styleUrls: ['./customer-account-list.component.css']
})
export class CustomerAccountListComponent implements OnInit {

  customer: Customer[] = [];

  p: number = 1;
  
  
  constructor(private customerAccountService: CustomerAccountService,
              private location: Location) { }

  ngOnInit() {
    this.customerAccountService.getCustomerList().subscribe(
      (customer) => {
        console.log(customer)
        this.customer = customer;
      }
    );
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
