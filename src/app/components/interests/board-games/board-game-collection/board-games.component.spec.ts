import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGamesCollectionComponent } from './board-games.component';

describe('BoardGamesComponent', () => {
  let component: BoardGamesCollectionComponent;
  let fixture: ComponentFixture<BoardGamesCollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [BoardGamesCollectionComponent]
});
    fixture = TestBed.createComponent(BoardGamesCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
