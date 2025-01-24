import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTesteProductionComponent } from './page-teste-production.component';

describe('PageTesteProductionComponent', () => {
  let component: PageTesteProductionComponent;
  let fixture: ComponentFixture<PageTesteProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTesteProductionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageTesteProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
