import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FidelidadeComponent } from './fidelidade.component';

describe('FidelidadeComponent', () => {
  let component: FidelidadeComponent;
  let fixture: ComponentFixture<FidelidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FidelidadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FidelidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
