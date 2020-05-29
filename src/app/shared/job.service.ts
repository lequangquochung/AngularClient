import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Job } from './../Models/job.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  getJobList() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get(environment.apiBaseURL + '/Jobs/JobList');
  }

  getJobById (job_id: number): Observable<Job>{
    const url = `${environment.apiBaseURL}/Jobs/GetJobById/${job_id}`;
    return this.http.get<Job>(url).pipe(
      tap(selected => console.log(`selected = ${JSON.stringify(selected)}`)),
      // catchError(error => of(new Customer))
    );
  }

  createJob(job: Job) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(environment.apiBaseURL + '/Jobs/CreateNewJob',job);
  }
  editJob(job: Job){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(environment.apiBaseURL + '/Jobs/EditJob/', job);
  }
  
  deleteJob(job_id: number) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.delete(environment.apiBaseURL+ '/Jobs/DeleteJob/'+ job_id);
  }

}
