import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaLimitesComponent } from './grafica-limites.component';

describe('GraficaLimitesComponent', () => {
  let component: GraficaLimitesComponent;
  let fixture: ComponentFixture<GraficaLimitesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaLimitesComponent]
    });
    fixture = TestBed.createComponent(GraficaLimitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
