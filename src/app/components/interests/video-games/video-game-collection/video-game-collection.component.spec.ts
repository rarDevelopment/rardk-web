import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGamesComponent } from '../board-games/board-games.component';

describe('BoardGamesComponent', () => {
  let component: BoardGamesComponent;
  let fixture: ComponentFixture<BoardGamesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [BoardGamesComponent]
});
    fixture = TestBed.createComponent(BoardGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
