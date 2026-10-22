import { TestBed } from '@angular/core/testing';
import { Testimonial } from './testimonial.service';

describe('Testimonial', () => {
  let service: Testimonial;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Testimonial);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
