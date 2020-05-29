import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

//model
import { Job } from './../Models/job.model';

//services
import { JobService } from './../shared/job.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material/';


@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  job: Job;

  ELEMENT_DATA: Job[];
  displayedColumns: string[] = ['job_code', 'job_name', 'job_description', 'totalCustomer','job_id'];
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  // dataSource = new MatTableDataSource<Job>(this.ELEMENT_DATA);
 
  dataSource = new MatTableDataSource<Job>(this.ELEMENT_DATA);

  constructor(private jobService: JobService,
    private location: Location) { }

  ngOnInit() {
    this.jobService.getJobList().subscribe(
      Subdata => this.dataSource.data = Subdata as Job[]
    );

    this.dataSource.sort=this.sort;
    this.dataSource.paginator = this.paginator;
  }
  deleteJob(job_id) {
    this.cancel();
    this.jobService.deleteJob(job_id).subscribe(
      (data) => { console.log(data) }
    );
  }

  apllyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
