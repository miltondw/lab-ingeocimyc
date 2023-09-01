import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateSolicitanteComponent } from './form-create-solicitante.component';

describe('FormCreateSolicitanteComponent', () => {
  let component: FormCreateSolicitanteComponent;
  let fixture: ComponentFixture<FormCreateSolicitanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCreateSolicitanteComponent]
    });
    fixture = TestBed.createComponent(FormCreateSolicitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
