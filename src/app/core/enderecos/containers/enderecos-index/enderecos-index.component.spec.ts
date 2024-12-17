import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecosIndexComponent } from './enderecos-index.component';

describe('EnderecosIndexComponent', () => {
  let component: EnderecosIndexComponent;
  let fixture: ComponentFixture<EnderecosIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnderecosIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnderecosIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
