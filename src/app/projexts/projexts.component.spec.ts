import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjextsComponent } from './projexts.component';

describe('ProjextsComponent', () => {
  let component: ProjextsComponent;
  let fixture: ComponentFixture<ProjextsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjextsComponent]
    });
    fixture = TestBed.createComponent(ProjextsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
