import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsayoLiquidoComponent } from './ensayo-liquido.component';

describe('EnsayoLiquidoComponent', () => {
  let component: EnsayoLiquidoComponent;
  let fixture: ComponentFixture<EnsayoLiquidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnsayoLiquidoComponent]
    });
    fixture = TestBed.createComponent(EnsayoLiquidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
