import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSolicitantesComponent } from './list-solicitantes.component';

describe('ListSolicitantesComponent', () => {
  let component: ListSolicitantesComponent;
  let fixture: ComponentFixture<ListSolicitantesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSolicitantesComponent]
    });
    fixture = TestBed.createComponent(ListSolicitantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
