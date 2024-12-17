import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacotesFilterComponent } from './pacotes-filter.component';

describe('PacotesFilterComponent', () => {
  let component: PacotesFilterComponent;
  let fixture: ComponentFixture<PacotesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacotesFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacotesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
