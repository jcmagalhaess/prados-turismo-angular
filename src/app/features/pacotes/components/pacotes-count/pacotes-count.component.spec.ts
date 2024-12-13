import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacotesCountComponent } from './pacotes-count.component';

describe('PacotesCountComponent', () => {
  let component: PacotesCountComponent;
  let fixture: ComponentFixture<PacotesCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacotesCountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacotesCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
