import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeEnsayoComponent } from './informe-ensayo.component';

describe('InformeEnsayoComponent', () => {
  let component: InformeEnsayoComponent;
  let fixture: ComponentFixture<InformeEnsayoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformeEnsayoComponent]
    });
    fixture = TestBed.createComponent(InformeEnsayoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
