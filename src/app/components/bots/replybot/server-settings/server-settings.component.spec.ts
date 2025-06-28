import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationEditorDialogComponent } from './guild-configuration.component';

describe('ConfigurationEditorDialogComponent', () => {
  let component: ConfigurationEditorDialogComponent;
  let fixture: ComponentFixture<ConfigurationEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurationEditorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
