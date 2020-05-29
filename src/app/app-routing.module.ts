import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobEditComponent } from './job-edit/job-edit.component';
import { JobListComponent } from './job-list/job-list.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//models
import {Customer} from './Models/customer.model';

import{CustomerAccountComponent} from './customer-account/customer-account.component';
import {CustomerAccountListComponent} from './customer-account-list/customer-account-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { JobCreateComponent } from './job-create/job-create.component';



const routes: Routes = [
  // {path: '',redirectTo:'/dashboard',pathMatch: 'full'},
  // {path: 'Dashboard', component: DashboardComponent},
  {path: 'createcustomer', component: CustomerAccountComponent},
  {path: 'listcustomer', component: CustomerAccountListComponent},
  {path: 'customerdetail/:customer_id', component: CustomerDetailComponent},
  {path: 'customerdetail/:customer_id/edit', component: CustomerEditComponent},
  {path: 'createjob', component: JobCreateComponent},
  {path: 'joblist', component: JobListComponent},
  {path: 'jobdetail/:job_id', component: JobDetailComponent},
  {path: 'jobdetail/:job_id/edit', component: JobEditComponent},


  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
