import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsayoHumedadComponent } from './ensayo-humedad.component';

describe('EnsayoHumedadComponent', () => {
  let component: EnsayoHumedadComponent;
  let fixture: ComponentFixture<EnsayoHumedadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnsayoHumedadComponent]
    });
    fixture = TestBed.createComponent(EnsayoHumedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
