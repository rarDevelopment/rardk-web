import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNumbersComponent } from './page-numbers.component';

describe('PageNumbersComponent', () => {
  let component: PageNumbersComponent;
  let fixture: ComponentFixture<PageNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageNumbersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
