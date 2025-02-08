import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyableTextComponent } from './copyable-text.component';

describe('CopyableTextComponent', () => {
  let component: CopyableTextComponent;
  let fixture: ComponentFixture<CopyableTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopyableTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopyableTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
