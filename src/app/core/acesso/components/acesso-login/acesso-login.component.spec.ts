import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoLoginComponent } from './acesso-login.component';

describe('AcessoLoginComponent', () => {
  let component: AcessoLoginComponent;
  let fixture: ComponentFixture<AcessoLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcessoLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcessoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
