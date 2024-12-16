import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoIndexComponent } from './acesso-index.component';

describe('AcessoIndexComponent', () => {
  let component: AcessoIndexComponent;
  let fixture: ComponentFixture<AcessoIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcessoIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcessoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
