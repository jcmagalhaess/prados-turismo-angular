import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeIndexComponent } from './containers/home-index/home-index.component';

describe('HomeIndexComponent', () => {
  let component: HomeIndexComponent;
  let fixture: ComponentFixture<HomeIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
