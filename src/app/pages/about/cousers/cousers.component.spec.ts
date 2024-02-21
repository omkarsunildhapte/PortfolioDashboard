import { ComponentFixture, TestBed } from '@angular/core/testing';

import CousersComponent from './cousers.component';

describe('CousersComponent', () => {
  let component: CousersComponent;
  let fixture: ComponentFixture<CousersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CousersComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CousersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
