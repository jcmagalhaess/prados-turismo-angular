import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuCarrinhoCupomComponent } from './meu-carrinho-cupom.component';

describe('MeuCarrinhoCupomComponent', () => {
  let component: MeuCarrinhoCupomComponent;
  let fixture: ComponentFixture<MeuCarrinhoCupomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeuCarrinhoCupomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeuCarrinhoCupomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
