import { JobService } from './../shared/job.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Customer } from './../Models/customer.model';
import { CustomerAccountService } from './../shared/customer-account.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  jobList = [];
  customerList: Customer[] = [];
  // customerForm: FormArray = this.fb.array([]);
  customerForm: FormGroup;
  urlImage: any;
  base64textString: string;
  customer: Customer;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private customerAccountService: CustomerAccountService,
    private jobService: JobService
  ) {
    this.customerForm = this.fb.group({
      customer_id: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      gender: ['Male'],
      address: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', Validators.required],
      phone_number: ['', Validators.required],
      description: ['', Validators.required],
      job_id: [1],
      imgUrl: ['', Validators.required]
    });
  }

  ngOnInit() {
    const customer_id = +this.route.snapshot.paramMap.get('customer_id');
    console.log(`this.route.snapshot.paramMap = ${JSON.stringify(this.route.snapshot.paramMap)}`);
    this.customerAccountService.getCustomerById(customer_id).subscribe((customer) => {
      this.customerForm = this.fb.group({
        customer_id: [customer.customer_id, Validators.required],
        first_name: [customer.first_name, Validators.required],
        last_name: [customer.last_name, Validators.required],
        gender: ['Male'],
        address: [customer.address, Validators.required],
        city: [customer.city, Validators.required],
        email: [customer.email, Validators.required],
        phone_number: [customer.phone_number, Validators.required],
        description: [customer.description, Validators.required],
        job_id: [1],
        imgUrl: [customer.imgUrl]
      });
      if (customer.imgUrl !== null) {
        this.urlImage = customer.imgUrl;
      }
    });

    //job Service
    this.jobService.getJobList().subscribe(
      res => this.jobList = res as []
    );
  }

  onFormSubmit() {
    
    let customer = this.customerForm.value;
    if (this.urlImage) {
      customer.imgUrl = this.urlImage;
    }
    console.log(this.customerForm.value);
    this.customerAccountService.editCustomer(customer).subscribe();
    alert("successfully")
    // this.customerForm.reset();
  }


  deleteCustomer(customer_id) {
    this.customerAccountService.deleteCustomter(customer_id).subscribe();
    alert("successfully");
  }


  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.urlImage = (event.target as any).result;
      }
    }
  }


  goBack(): void {
    this.location.back();
  }

}
