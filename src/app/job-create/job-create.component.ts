
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

//model
import { Customer } from '../Models/customer.model';
import { Job } from './../Models/job.model';

//service
import { JobService } from '../shared/job.service';
import { CustomerAccountService } from '../shared/customer-account.service';

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.css']
})
export class JobCreateComponent implements OnInit {

  customerList = [];
  jobForm: FormGroup;

  constructor(private jobService: JobService,
              private customerAccountService: CustomerAccountService,
              private location: Location,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.jobForm = this.fb.group({
      job_code: ['', Validators.required],
      job_name: ['', Validators.required],
      job_description: ['', Validators.required]
    });

    this.customerAccountService.getCustomerList().subscribe(
      res => this.customerList = res as []
    )
  }

  onFormSubmit() {
    let job = this.jobForm.value;
    this.createJob(job);
  }

  createJob(job: Job) {
    this.jobService.createJob(job).subscribe(
      (data) => { console.log(data) }
    );
    console.log(job);
    this.successfully();   
    this.jobForm.reset();
  }

  goBack(): void {
    this.location.back();
  }

  
  ///Alert 
  successfully(): void {
    Swal.fire({
      icon: 'success',
      title: 'Successfully !',
      text: 'Created Successfully !',
    })
  }

  cancel(): void {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.location.back();
      }
    })
  }
  // 


}



