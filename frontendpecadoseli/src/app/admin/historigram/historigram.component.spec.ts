import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorigramComponent } from './historigram.component';

describe('HistorigramComponent', () => {
  let component: HistorigramComponent;
  let fixture: ComponentFixture<HistorigramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorigramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorigramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
