import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacotesSidebarComponent } from './pacotes-sidebar.component';

describe('PacotesSidebarComponent', () => {
  let component: PacotesSidebarComponent;
  let fixture: ComponentFixture<PacotesSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacotesSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacotesSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
