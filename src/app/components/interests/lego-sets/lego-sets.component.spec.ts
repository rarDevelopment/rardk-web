import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegoSetsCollectionComponent } from './lego-sets.component';

describe('LegoSetsComponent', () => {
  let component: LegoSetsCollectionComponent;
  let fixture: ComponentFixture<LegoSetsCollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [LegoSetsCollectionComponent]
});
    fixture = TestBed.createComponent(LegoSetsCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
