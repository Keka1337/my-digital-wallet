import { TestBed } from '@angular/core/testing';

import { TransakcijeService } from './transakcije.service';

describe('TransakcijeService', () => {
  let service: TransakcijeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransakcijeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
