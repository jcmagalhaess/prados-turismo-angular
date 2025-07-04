import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermosUsoSemAereoComponent } from './termos-uso-sem-aereo.component';

describe('TermosUsoSemAereoComponent', () => {
  let component: TermosUsoSemAereoComponent;
  let fixture: ComponentFixture<TermosUsoSemAereoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermosUsoSemAereoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermosUsoSemAereoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
