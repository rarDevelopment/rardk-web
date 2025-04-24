import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyDefinitionEditorComponent } from './reply-definition-editor-dialog.component';

describe('ReplyDefinitionEditorDialogComponent', () => {
  let component: ReplyDefinitionEditorComponent;
  let fixture: ComponentFixture<ReplyDefinitionEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ReplyDefinitionEditorComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(ReplyDefinitionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
