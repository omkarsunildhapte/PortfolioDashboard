import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommanPagesFooterComponent } from './comman-pages-footer.component';

describe('CommanPagesFooterComponent', () => {
  let component: CommanPagesFooterComponent;
  let fixture: ComponentFixture<CommanPagesFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommanPagesFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommanPagesFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
