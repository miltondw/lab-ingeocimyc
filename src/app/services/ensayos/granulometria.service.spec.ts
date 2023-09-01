import { TestBed } from '@angular/core/testing';

import { GranulometriaService } from './granulometria.service';

describe('GranulometriaService', () => {
  let service: GranulometriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GranulometriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
