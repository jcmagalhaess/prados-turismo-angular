import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosModalComponent } from './pedidos-modal.component';

describe('PedidosModalComponent', () => {
  let component: PedidosModalComponent;
  let fixture: ComponentFixture<PedidosModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidosModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
