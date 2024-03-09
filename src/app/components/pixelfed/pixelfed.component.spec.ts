import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixelfedComponent } from './pixelfed.component';

describe('PixelfedComponent', () => {
  let component: PixelfedComponent;
  let fixture: ComponentFixture<PixelfedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PixelfedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PixelfedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
