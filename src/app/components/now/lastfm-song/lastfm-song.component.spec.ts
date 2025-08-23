import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastfmSongComponent } from './lastfm-song.component';

describe('LastfmSongComponent', () => {
  let component: LastfmSongComponent;
  let fixture: ComponentFixture<LastfmSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastfmSongComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastfmSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
