import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermosUsoComAereoComponent } from './termos-uso-com-aereo.component';

describe('TermosUsoComAereoComponent', () => {
  let component: TermosUsoComAereoComponent;
  let fixture: ComponentFixture<TermosUsoComAereoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermosUsoComAereoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermosUsoComAereoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
