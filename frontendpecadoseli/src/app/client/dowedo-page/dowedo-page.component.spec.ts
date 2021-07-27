import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DowedoPageComponent } from './dowedo-page.component';

describe('DowedoPageComponent', () => {
  let component: DowedoPageComponent;
  let fixture: ComponentFixture<DowedoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DowedoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DowedoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
