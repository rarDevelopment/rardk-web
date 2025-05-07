import { Component, EventEmitter, Output } from '@angular/core';
import { HelpKeywordDetail } from 'src/app/components/bots/models/replybot/help-keyword-detail';
import { CopyableTextComponent } from '../../../../../shared/copyable-text/copyable-text.component';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss'],
  imports: [CopyableTextComponent],
})
export class HelpDialogComponent {
  @Output() close = new EventEmitter<void>();

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

  closeHelp() {
    this.close.emit();
  }
}
