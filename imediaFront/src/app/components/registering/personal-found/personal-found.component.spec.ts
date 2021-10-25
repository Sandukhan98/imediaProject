import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalFoundComponent } from './personal-found.component';

describe('PersonalFoundComponent', () => {
  let component: PersonalFoundComponent;
  let fixture: ComponentFixture<PersonalFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
