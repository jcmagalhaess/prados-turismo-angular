import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacotesPriceComponent } from './pacotes-price.component';

describe('PacotesPriceComponent', () => {
  let component: PacotesPriceComponent;
  let fixture: ComponentFixture<PacotesPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacotesPriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacotesPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
