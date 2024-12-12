import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacotesIndexComponent } from './pacotes-index.component';

describe('PacotesIndexComponent', () => {
  let component: PacotesIndexComponent;
  let fixture: ComponentFixture<PacotesIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacotesIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacotesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
