import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ReplyDefinitionEditorDialogComponent } from '../../reply-definition-editor-dialog.component';
import { HelpKeywordDetail } from 'src/app/components/bots/models/replybot/help-keyword-detail';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-help-dialog',
    templateUrl: './help-dialog.component.html',
    styleUrls: ['./help-dialog.component.scss'],
    standalone: true,
    imports: [
        NgFor,
        MatButtonModule,
        ClipboardModule,
        MatIconModule,
    ],
})
export class HelpDialogComponent {
  public dialogData: any;
  public keywords: HelpKeywordDetail[] = [
    {
      keyword: '{{BOTNAME}}',
      description: `The bot's name. Always use this, never use the bot's names specifically. Can be used in both triggers and replies.`,
    },
    {
      keyword: '{{MESSAGE}}',
      description: `Use this in a reply to include the original message.`,
    },
    {
      keyword: '{{MESSAGEWITHOUTREPLYBOT}}',
      description: `Use this in a reply to include the original message, without the bot's name included.`,
    },
    {
      keyword: '{{MESSAGEUPPERCASE}}',
      description: `Use this in a reply to include the original message, but all in uppercase letters.`,
    },
    {
      keyword: '{{MESSAGEWITHOUTTRIGGER}}',
      description: `Use this in a reply to include the original message, without the trigger portion.`,
    },
    {
      keyword: '{{USERNAME}}',
      description: `Use this in a reply to include the username (non-mention) of the user who triggered this reply.`,
    },
    {
      keyword: '{{USERTAG}}',
      description: `Use this in a reply to include the username of the user who triggered this reply.`,
    },
    {
      keyword: '{{DELETEMESSAGE}}',
      description: `Use this in a reply to delete the original message.`,
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<ReplyDefinitionEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogData = data;
  }

  copyToClipboard(keyword: string) {}

  closeHelp() {
    this.dialogRef.close();
  }
}
