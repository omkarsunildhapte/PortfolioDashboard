import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommanPagesComponent } from './comman-pages.component';

describe('CommanPagesComponent', () => {
  let component: CommanPagesComponent;
  let fixture: ComponentFixture<CommanPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommanPagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommanPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
