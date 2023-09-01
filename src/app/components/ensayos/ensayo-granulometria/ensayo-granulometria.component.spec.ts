import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsayoGranulometriaComponent } from './ensayo-granulometria.component';

describe('EnsayoGranulometriaComponent', () => {
  let component: EnsayoGranulometriaComponent;
  let fixture: ComponentFixture<EnsayoGranulometriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnsayoGranulometriaComponent]
    });
    fixture = TestBed.createComponent(EnsayoGranulometriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
