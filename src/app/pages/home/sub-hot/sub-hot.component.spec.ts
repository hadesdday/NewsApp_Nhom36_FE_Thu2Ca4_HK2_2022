import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubHotComponent } from './sub-hot.component';

describe('SubHotComponent', () => {
  let component: SubHotComponent;
  let fixture: ComponentFixture<SubHotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubHotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubHotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
