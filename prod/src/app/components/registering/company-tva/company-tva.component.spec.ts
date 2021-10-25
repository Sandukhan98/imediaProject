import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTVAComponent } from './company-tva.component';

describe('CompanyTVAComponent', () => {
  let component: CompanyTVAComponent;
  let fixture: ComponentFixture<CompanyTVAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyTVAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyTVAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
