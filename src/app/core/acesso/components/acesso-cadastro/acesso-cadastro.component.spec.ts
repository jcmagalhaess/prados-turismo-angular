import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoCadastroComponent } from './acesso-cadastro.component';

describe('AcessoCadastroComponent', () => {
  let component: AcessoCadastroComponent;
  let fixture: ComponentFixture<AcessoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcessoCadastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcessoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
