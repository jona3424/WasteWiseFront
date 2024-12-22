import { TestBed } from '@angular/core/testing';

import { RoutfinderService } from './routfinder.service';

describe('RoutfinderService', () => {
  let service: RoutfinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutfinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
