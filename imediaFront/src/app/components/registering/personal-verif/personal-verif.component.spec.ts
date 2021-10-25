import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalVerifComponent } from './personal-verif.component';

describe('PersonalVerifComponent', () => {
  let component: PersonalVerifComponent;
  let fixture: ComponentFixture<PersonalVerifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalVerifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalVerifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
