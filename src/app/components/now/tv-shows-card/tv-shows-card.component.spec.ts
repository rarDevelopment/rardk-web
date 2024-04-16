import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowsCardComponent } from './tv-shows-card.component';

describe('TvShowsCardComponent', () => {
  let component: TvShowsCardComponent;
  let fixture: ComponentFixture<TvShowsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvShowsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TvShowsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
