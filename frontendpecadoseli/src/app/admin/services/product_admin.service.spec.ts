import { TestBed } from '@angular/core/testing';

import { ProductServiceAdmin } from './product_admin.service';

describe('ProductService', () => {
  let service: ProductServiceAdmin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductServiceAdmin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
