import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGamePlaysComponent } from './board-game-plays.component';

describe('BoardGamePlaysComponent', () => {
  let component: BoardGamePlaysComponent;
  let fixture: ComponentFixture<BoardGamePlaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardGamePlaysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardGamePlaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
