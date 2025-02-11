import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaFeedComponent } from './media-feed.component';

describe('MediaFeedComponent', () => {
  let component: MediaFeedComponent;
  let fixture: ComponentFixture<MediaFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
