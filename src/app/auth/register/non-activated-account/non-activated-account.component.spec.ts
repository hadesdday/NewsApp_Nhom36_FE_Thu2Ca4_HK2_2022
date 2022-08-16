import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonActivatedAccountComponent } from './non-activated-account.component';

describe('NonActivatedAccountComponent', () => {
  let component: NonActivatedAccountComponent;
  let fixture: ComponentFixture<NonActivatedAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonActivatedAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonActivatedAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
