import { TestBed } from '@angular/core/testing';

import { PlasticoService } from './plastico.service';

describe('PlasticoService', () => {
  let service: PlasticoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlasticoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
