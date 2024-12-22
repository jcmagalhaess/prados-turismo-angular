import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacotesSidebarJeriComponent } from './pacotes-sidebar-jeri.component';

describe('PacotesSidebarJeriComponent', () => {
  let component: PacotesSidebarJeriComponent;
  let fixture: ComponentFixture<PacotesSidebarJeriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacotesSidebarJeriComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacotesSidebarJeriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
