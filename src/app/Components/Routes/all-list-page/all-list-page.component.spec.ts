import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllListPageComponent } from './all-list-page.component';

describe('AllListPageComponent', () => {
  let component: AllListPageComponent;
  let fixture: ComponentFixture<AllListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
