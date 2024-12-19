import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuCarrinhoOffcanvasComponent } from './meu-carrinho-offcanvas.component';

describe('MeuCarrinhoOffcanvasComponent', () => {
  let component: MeuCarrinhoOffcanvasComponent;
  let fixture: ComponentFixture<MeuCarrinhoOffcanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeuCarrinhoOffcanvasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeuCarrinhoOffcanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
