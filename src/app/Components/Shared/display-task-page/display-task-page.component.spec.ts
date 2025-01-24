import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTaskPageComponent } from './display-task-page.component';

describe('DisplayTaskPageComponent', () => {
  let component: DisplayTaskPageComponent;
  let fixture: ComponentFixture<DisplayTaskPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayTaskPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayTaskPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
