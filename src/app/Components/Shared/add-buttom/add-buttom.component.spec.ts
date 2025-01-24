import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddButtomComponent } from './add-buttom.component';

describe('AddButtomComponent', () => {
  let component: AddButtomComponent;
  let fixture: ComponentFixture<AddButtomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddButtomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddButtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
