import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuCarrinhoReservaComponent } from './meu-carrinho-reserva.component';

describe('MeuCarrinhoReservaComponent', () => {
  let component: MeuCarrinhoReservaComponent;
  let fixture: ComponentFixture<MeuCarrinhoReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeuCarrinhoReservaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeuCarrinhoReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
