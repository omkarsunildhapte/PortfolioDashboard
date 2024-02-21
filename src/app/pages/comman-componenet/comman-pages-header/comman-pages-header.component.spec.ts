import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommanPagesHeaderComponent } from './comman-pages-header.component';

describe('CommanPagesHeaderComponent', () => {
  let component: CommanPagesHeaderComponent;
  let fixture: ComponentFixture<CommanPagesHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommanPagesHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommanPagesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
