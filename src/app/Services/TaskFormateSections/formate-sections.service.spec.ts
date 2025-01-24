import { TestBed } from '@angular/core/testing';

import { FormateSectionsService } from './formate-sections.service';

describe('FormateSectionsService', () => {
  let service: FormateSectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormateSectionsService);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
