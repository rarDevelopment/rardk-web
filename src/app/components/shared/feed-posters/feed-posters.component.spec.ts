import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedPostersComponent } from './feed-posters.component';

describe('FeedPostersComponent', () => {
  let component: FeedPostersComponent;
  let fixture: ComponentFixture<FeedPostersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [FeedPostersComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(FeedPostersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
