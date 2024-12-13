import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacotesParticipantesComponent } from './pacotes-participantes.component';

describe('PacotesParticipantesComponent', () => {
  let component: PacotesParticipantesComponent;
  let fixture: ComponentFixture<PacotesParticipantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacotesParticipantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacotesParticipantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
