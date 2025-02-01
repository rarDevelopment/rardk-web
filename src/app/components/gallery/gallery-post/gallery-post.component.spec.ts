import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryPostComponent } from './gallery-post.component';

describe('GalleryPostComponent', () => {
  let component: GalleryPostComponent;
  let fixture: ComponentFixture<GalleryPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
