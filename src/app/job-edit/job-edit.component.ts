import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
//library
import Swal from 'sweetalert2';
//model
import { Job } from '../Models/job.model';
//service
import { CustomerAccountService } from './../shared/customer-account.service';
import { JobService } from './../shared/job.service';




@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {

  jobList: Job[] = [];
  job: Job;
  jobForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private customerAccountService: CustomerAccountService,
    private jobService: JobService
  ) { }

  ngOnInit() {
    const job_id = +this.route.snapshot.paramMap.get('job_id');
    console.log(`this.route.snapshot.paramMap = ${JSON.stringify(this.route.snapshot.paramMap)}`);
    this.jobService.getJobById(job_id).subscribe((job) => {
      this.jobForm = this.fb.group({
        job_id : [job_id, Validators.required],
        job_code: [job.job_code, Validators.required],
        job_name: [job.job_name, Validators.required],
        job_description: [job.job_description, Validators.required]
      })
    });    
  }
  onFormSubmit() {
    let job = this.jobForm.value;
    console.log(this.jobForm.value);
    this.jobService.editJob(job).subscribe();
    this.successfully();
    // this.customerForm.reset();
   
  }

  deleteCustomer(customer_id) {
    this.customerAccountService.deleteCustomter(customer_id).subscribe();
    alert("successfully");
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
goBack(): void {
  this.location.back();
}

}
