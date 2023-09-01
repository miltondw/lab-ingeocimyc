import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSolicitanteComponent } from './create-solicitante.component';

describe('CreateSolicitanteComponent', () => {
  let component: CreateSolicitanteComponent;
  let fixture: ComponentFixture<CreateSolicitanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSolicitanteComponent]
    });
    fixture = TestBed.createComponent(CreateSolicitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
