import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcursaoCardComponent } from './excursao-card.component';

describe('ExcursaoCardComponent', () => {
  let component: ExcursaoCardComponent;
  let fixture: ComponentFixture<ExcursaoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcursaoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcursaoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
