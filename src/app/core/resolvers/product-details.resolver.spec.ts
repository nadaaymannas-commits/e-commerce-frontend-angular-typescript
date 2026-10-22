import { TestBed } from '@angular/core/testing';
import { ProductDetailsResolver } from './product-details.resolver';

describe('ProductDetailsResolver', () => {
  let service: ProductDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDetailsResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
