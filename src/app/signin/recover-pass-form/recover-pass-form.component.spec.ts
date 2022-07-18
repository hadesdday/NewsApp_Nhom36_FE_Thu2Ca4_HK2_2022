import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverPassFormComponent } from './recover-pass-form.component';

describe('RecoverPassFormComponent', () => {
  let component: RecoverPassFormComponent;
  let fixture: ComponentFixture<RecoverPassFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoverPassFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverPassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
