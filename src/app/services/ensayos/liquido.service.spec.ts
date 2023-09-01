import { TestBed } from '@angular/core/testing';

import { LiquidoService } from './liquido.service';

describe('LiquidoService', () => {
  let service: LiquidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiquidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
