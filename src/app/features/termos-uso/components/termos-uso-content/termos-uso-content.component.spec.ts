import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermosUsoContentComponent } from './termos-uso-content.component';

describe('TermosUsoContentComponent', () => {
  let component: TermosUsoContentComponent;
  let fixture: ComponentFixture<TermosUsoContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermosUsoContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermosUsoContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
