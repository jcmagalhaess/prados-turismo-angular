import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeletorQuartoComponent } from './seletor-quarto.component';

describe('SeletorQuartoComponent', () => {
  let component: SeletorQuartoComponent;
  let fixture: ComponentFixture<SeletorQuartoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeletorQuartoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeletorQuartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
