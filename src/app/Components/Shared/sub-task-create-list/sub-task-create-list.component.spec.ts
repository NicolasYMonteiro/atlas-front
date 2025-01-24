import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTaskCreateListComponent } from './sub-task-create-list.component';

describe('SubTaskCreateListComponent', () => {
  let component: SubTaskCreateListComponent;
  let fixture: ComponentFixture<SubTaskCreateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubTaskCreateListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubTaskCreateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
