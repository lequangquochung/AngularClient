/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomerAccountService } from './customer-account.service';

describe('Service: CustomerAccount', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerAccountService]
    });
  });

  it('should ...', inject([CustomerAccountService], (service: CustomerAccountService) => {
    expect(service).toBeTruthy();
  }));
});
