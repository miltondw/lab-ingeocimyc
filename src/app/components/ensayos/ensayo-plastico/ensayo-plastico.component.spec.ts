import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsayoPlasticoComponent } from './ensayo-plastico.component';

describe('EnsayoPlasticoComponent', () => {
  let component: EnsayoPlasticoComponent;
  let fixture: ComponentFixture<EnsayoPlasticoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnsayoPlasticoComponent]
    });
    fixture = TestBed.createComponent(EnsayoPlasticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
