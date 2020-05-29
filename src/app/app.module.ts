

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
//service
import {CustomerAccountService} from './shared/customer-account.service';
import {JobService} from './shared/job.service';
//
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//material 
import { MatTableModule } from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
//
import { CustomerAccountComponent } from './customer-account/customer-account.component';
import { CustomerAccountListComponent } from './customer-account-list/customer-account-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { JobCreateComponent } from './job-create/job-create.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobEditComponent } from './job-edit/job-edit.component';

@NgModule({
   declarations: [
      AppComponent,
      CustomerAccountComponent,
      CustomerAccountListComponent,
      CustomerDetailComponent,
      CustomerEditComponent,
      JobCreateComponent,
      JobDetailComponent,
      JobListComponent,
      JobEditComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      MatTableModule,
      MatSortModule,
      MatPaginatorModule,
      MatButtonModule,
      MatIconModule,
      MatInputModule
   ],
   providers: [
      JobService,
      CustomerAccountService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
