import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FidelidadeBeneficioComponent } from './fidelidade-beneficio.component';

describe('FidelidadeBeneficioComponent', () => {
  let component: FidelidadeBeneficioComponent;
  let fixture: ComponentFixture<FidelidadeBeneficioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FidelidadeBeneficioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FidelidadeBeneficioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
