import { TestBed } from '@angular/core/testing';

import { RoutefinderService } from './routefinder.service';

describe('RoutefinderService', () => {
  let service: RoutefinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutefinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
