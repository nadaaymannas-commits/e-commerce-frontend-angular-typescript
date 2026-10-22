import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestimonialsList } from './testimonials-list';

describe('TestimonialsList', () => {
  let component: TestimonialsList;
  let fixture: ComponentFixture<TestimonialsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialsList],
    }).compileComponents();

    fixture = TestBed.createComponent(TestimonialsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
