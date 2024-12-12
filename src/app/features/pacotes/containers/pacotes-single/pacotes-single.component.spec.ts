import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacotesSingleComponent } from './pacotes-single.component';

describe('PacotesSingleComponent', () => {
  let component: PacotesSingleComponent;
  let fixture: ComponentFixture<PacotesSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacotesSingleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacotesSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
