import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOrdersComponent } from './card-orders.component';

describe('CardOrdersComponent', () => {
  let component: CardOrdersComponent;
  let fixture: ComponentFixture<CardOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
