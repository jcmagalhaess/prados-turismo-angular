import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosViagemComponent } from './documentos-viagem.component';

describe('DocumentosViagemComponent', () => {
  let component: DocumentosViagemComponent;
  let fixture: ComponentFixture<DocumentosViagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentosViagemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentosViagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
