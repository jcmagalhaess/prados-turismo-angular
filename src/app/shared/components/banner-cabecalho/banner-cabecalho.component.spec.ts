import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCabecalhoComponent } from './banner-cabecalho.component';

describe('BannerCabecalhoComponent', () => {
  let component: BannerCabecalhoComponent;
  let fixture: ComponentFixture<BannerCabecalhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerCabecalhoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerCabecalhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
