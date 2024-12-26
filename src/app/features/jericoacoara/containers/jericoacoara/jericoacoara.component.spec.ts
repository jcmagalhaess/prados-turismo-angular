import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JericoacoaraComponent } from './jericoacoara.component';

describe('JericoacoaraComponent', () => {
  let component: JericoacoaraComponent;
  let fixture: ComponentFixture<JericoacoaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JericoacoaraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JericoacoaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
