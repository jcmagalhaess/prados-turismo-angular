import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacotesModalComponent } from './pacotes-modal.component';

describe('PacotesModalComponent', () => {
  let component: PacotesModalComponent;
  let fixture: ComponentFixture<PacotesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacotesModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacotesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
