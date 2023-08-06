import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifictedComponent } from './certificted.component';

describe('CertifictedComponent', () => {
  let component: CertifictedComponent;
  let fixture: ComponentFixture<CertifictedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertifictedComponent]
    });
    fixture = TestBed.createComponent(CertifictedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
