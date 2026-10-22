import { TestBed } from '@angular/core/testing';
import { Subcategory } from './subcategory.service';

describe('Subcategory', () => {
  let service: Subcategory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Subcategory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
