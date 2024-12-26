import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JericoacoaraSidebarComponent } from './jericoacoara-sidebar.component';

describe('JericoacoaraSidebarComponent', () => {
  let component: JericoacoaraSidebarComponent;
  let fixture: ComponentFixture<JericoacoaraSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JericoacoaraSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JericoacoaraSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
