import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ReplyDefinition } from 'src/app/components/bots/models/replybot/reply-definition';
import { ReplyDefinitionEditorData as ReplyDefinitionEditorData } from 'src/app/components/bots/models/replybot/reply-definition-editor-data';
import { HelpDialogComponent } from './help-dialog/help-dialog/help-dialog.component';
import emojiRegex from 'emoji-regex';
import { FormsModule } from '@angular/forms';
import { TooltipDirective } from 'src/app/directives/tooltip.directive';
import { BotPageComponent } from '../../bot-page/bot-page.component';
import { forkJoin, map, switchMap, take, throwError, timeout } from 'rxjs';
import { DiscordGuild } from '../../models/discord-guild';
import { GuildConfiguration } from '../../models/replybot/guild-configuration';
import { DiscordUser } from '../../models/discord-user';
import { LoadingIndicatorComponent } from '../../../shared/loading-indicator/loading-indicator.component';
import { PageTitleComponent } from 'src/app/components/shared/page-title/page-title.component';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ModalComponent } from '../../../shared/modal/modal.component'; // Import ModalComponent

@Component({
  selector: 'app-reply-definition-editor-dialog',
  templateUrl: './reply-definition-editor-dialog.component.html',
  styleUrls: ['./reply-definition-editor-dialog.component.scss'],
  imports: [
    CommonModule,
    TooltipDirective,
    FormsModule,
    LoadingIndicatorComponent,
    PageTitleComponent,
    ModalComponent,
    HelpDialogComponent,
  ],
})
export class ReplyDefinitionEditorComponent extends BotPageComponent implements OnInit {
  public editorData: ReplyDefinitionEditorData;
  public maxReplyLength: number = 1800;
  public isLoading: boolean = false;
  public isSaving: boolean = false;
  public forbiddenTermErrorMessage: string = 'There is a forbidden term present in this field.';
  public invalidEmojiErrorMessage: string =
    'A reaction must be one (1) valid emoji (custom emoji are not supported yet).';
  public invalidIdErrorMessage: string = 'An ID must be a valid number.';

  public guildId: string;
  public replyDefinitionId: string;
  public copyFromId: string;

  public isAuthorizedToAdministrate = false;
  public discordUser: DiscordUser;
  public guildName: string;

  public forbiddenTerms: string[] = ['HowLongToBeat', 'DefineWord', 'FortniteShopInfo', 'Poll'];
  public showHelpDialog: boolean = false; // Flag to control help dialog visibility

  ngOnInit(): void {
    this.initializePageContents();
  }

  private initializePageContents() {
    this.isLoading = true;
    this.route.queryParams
      .pipe(
        take(1),
        switchMap((params) => {
          this.guildId = params['guildId'];
          this.replyDefinitionId = params['replyDefinitionId'];
          this.copyFromId = params['copyFromId'];

          const accessToken = this.getLoginToken();
          return forkJoin([
            this.replybotService.getReplybotReplyDefinition(
              accessToken!,
              this.guildId,
              this.copyFromId ? this.copyFromId : this.replyDefinitionId
            ),
            this.discordService.getDiscordGuilds(accessToken!),
            this.replybotService.getReplybotGuildConfiguration(accessToken!, this.guildId),
            this.discordService.getDiscordUser(accessToken!),
          ]).pipe(
            timeout({
              each: 10000,
              with: () =>
                throwError(
                  () =>
                    new Error('Timed out waiting for response, logging out to renew access token.')
                ),
            }),
            map(([replyDefinition, discordGuilds, guildConfiguration, discordUser]) => {
              return {
                replyDefinition: replyDefinition,
                discordGuilds,
                guildConfiguration,
                discordUser,
              };
            })
          );
        })
      )
      .subscribe({
        next: (result: {
          replyDefinition: ReplyDefinition | null;
          discordGuilds: DiscordGuild[];
          guildConfiguration: GuildConfiguration;
          discordUser: DiscordUser;
        }) => {
          const currentGuild = result.discordGuilds.find((g) => g.id === this.guildId);
          if (currentGuild) {
            this.guildName = currentGuild.name;
            this.isAuthorizedToAdministrate = currentGuild.permissions.administrator;
          }
          result.guildConfiguration.adminUserIds.forEach((adminUserId) => {
            if (result.discordUser.id === adminUserId) {
              this.isAuthorizedToAdministrate = true;
            }
          });

          this.discordUser = result.discordUser;
          this.isLoading = false;

          if (this.isAuthorizedToAdministrate) {
            if (result.replyDefinition) {
              if (this.copyFromId) {
                this.addFromCopy(result.replyDefinition);
              } else {
                this.addFromExisting(result.replyDefinition, this.discordUser);
              }
            } else {
              this.editorData = {
                guildId: this.guildId,
                triggers: [],
                replies: [],
                reactions: [],
                channelIds: [],
                userIds: [],
                mentionAuthor: false,
                requiresBotName: false,
                isActive: true,
                user: {
                  id: result.discordUser.id,
                  username: result.discordUser.username,
                },
              } as ReplyDefinitionEditorData;
            }
          }
        },
        error: (error) => {
          console.error(error);
          this.snackbarService.showSnackBar(
            'Error retrieving page data. Login may have expired, please log in and try again.',
            true
          );
          window.setTimeout(() => this.logOutAndRedirect(), 3000);
        },
      });
  }

  addFromCopy(replyDefinition: ReplyDefinition) {
    this.editorData = {
      guildId: replyDefinition.guildId,
      mentionAuthor: replyDefinition.mentionAuthor,
      reactions: replyDefinition.reactions ?? [],
      replies: replyDefinition.replies ?? [],
      requiresBotName: replyDefinition.requiresBotName,
      triggers: replyDefinition.triggers ?? [],
      channelIds: replyDefinition.channelIds ?? [],
      userIds: replyDefinition.userIds ?? [],
      isActive: replyDefinition.isActive,
    } as ReplyDefinitionEditorData;
  }

  addFromExisting(replyDefinition: ReplyDefinition, discordUser: DiscordUser) {
    this.editorData = {
      id: replyDefinition.id,
      guildId: replyDefinition.guildId,
      mentionAuthor: replyDefinition.mentionAuthor,
      reactions: replyDefinition.reactions ?? [],
      replies: replyDefinition.replies ?? [],
      requiresBotName: replyDefinition.requiresBotName,
      triggers: replyDefinition.triggers ?? [],
      channelIds: replyDefinition.channelIds ?? [],
      userIds: replyDefinition.userIds ?? [],
      isActive: replyDefinition.isActive,
      user: {
        id: discordUser.id,
        username: discordUser.username,
      },
    } as ReplyDefinitionEditorData;
  }

  async addFromClipboard() {
    const clipboardValue = await navigator.clipboard.readText();

    if (
      confirm(
        'Are you sure you want to paste the clipboard data? This will overwrite any unsaved changes.'
      )
    ) {
      try {
        this.editorData = JSON.parse(clipboardValue);
        this.editorData.guildId = this.guildId;
      } catch (err) {
        console.error(err);
        this.snackbarService.showSnackBar('Your clipboard data is not a valid reply definition!', true);
      }
    }
  }

  trackByFn(index: number, item: any) {
    return index;
  }

  addTrigger() {
    this.editorData.triggers.push('');
  }

  removeTrigger(index: number) {
    this.editorData.triggers.splice(index, 1);
  }

  addReply() {
    this.editorData.replies.push('');
  }

  removeReply(index: number) {
    this.editorData.replies.splice(index, 1);
  }

  addReaction() {
    this.editorData.reactions.push('');
  }

  removeReaction(index: number) {
    this.editorData.reactions.splice(index, 1);
  }

  addChannelId() {
    this.editorData.channelIds.push('');
  }

  removeChannelId(index: number) {
    this.editorData.channelIds.splice(index, 1);
  }

  addUserId() {
    this.editorData.userIds.push('');
  }

  removeUserId(index: number) {
    this.editorData.userIds.splice(index, 1);
  }

  cancelEdit() {
    this.router.navigate(['bots/replybot/reply-definitions'], {
      queryParams: { guildId: this.guildId },
    });
  }

  isSaveEnabled(): boolean {
    return (
      this.editorData.triggers.length > 0 &&
      this.editorData.triggers.filter((t) => t.trim() !== '').length > 0 &&
      !!!this.editorData.triggers.find((t) => this.hasForbiddenTerm(t)) &&
      !!!this.editorData.replies.find((t) => this.hasForbiddenTerm(t)) &&
      !!!this.editorData.reactions.find((reaction) => !this.isValidSingleEmoji(reaction)) &&
      !this.isSaving
    );
  }

  isValidSingleEmoji(input: string) {
    const regex = emojiRegex();
    const matches = input.trim().match(regex);
    return input.trim() === '' || matches?.[0].length === input.trim().length;
  }

  isValidId(input: string) {
    return !isNaN(+input.trim());
  }

  hasForbiddenTerm(textToCheck: string) {
    const foundForbiddenTerms = this.forbiddenTerms.filter((t) => {
      return textToCheck.toLowerCase().includes(`{{${t.toLowerCase()}}}`);
    });
    return foundForbiddenTerms.length > 0;
  }

  saveEdit() {
    const triggersCleaned = this.removeDuplicates(
      this.removeEmptyStringsAndTrim(this.editorData.triggers)
    );
    const repliesCleaned = this.removeEmptyStringsAndTrim(this.editorData.replies);
    const channelIdsCleaned = this.removeEmptyStringsAndTrim(this.editorData.channelIds);
    const userIdsCleaned = this.removeEmptyStringsAndTrim(this.editorData.userIds);
    const reactionsCleaned = this.cleanReactions(this.editorData.reactions);

    const savedObject = {
      id: this.editorData?.id,
      guildId: this.editorData?.guildId,
      triggers: triggersCleaned,
      replies: repliesCleaned,
      mentionAuthor: this.editorData.mentionAuthor,
      requiresBotName: this.editorData.requiresBotName,
      channelIds: channelIdsCleaned,
      userIds: userIdsCleaned,
      reactions: reactionsCleaned,
      isActive: this.editorData.isActive,
    } as ReplyDefinition;
    if (savedObject) {
      this.saveReplyDefinition(savedObject);
    }
  }

  removeEmptyStringsAndTrim(replies: string[]): string[] {
    return replies.filter((r) => r.trim() !== '').map((r) => r.trim());
  }

  removeDuplicates(array: string[]): string[] {
    return Array.from(new Set(array));
  }

  cleanReactions(reactions: string[]) {
    const trimmedReactionsWithoutEmpty = this.removeEmptyStringsAndTrim(reactions);

    let reactionsWithoutDuplicates: string[] = [];

    trimmedReactionsWithoutEmpty.forEach((reaction) => {
      if (!reactionsWithoutDuplicates.includes(reaction)) {
        reactionsWithoutDuplicates.push(reaction);
      }
    });
    return reactionsWithoutDuplicates;
  }

  saveReplyDefinition(replyDefinition: ReplyDefinition) {
    this.isSaving = true;
    var accessToken = this.getLoginToken();

    const isUpdating = !!replyDefinition.id;

    if (!isUpdating) {
      replyDefinition.createdById = this.discordUser.id;
      replyDefinition.createdByUsername = this.discordUser.username;
    }
    replyDefinition.updatedById = this.discordUser.id;
    replyDefinition.updatedByUsername = this.discordUser.username;

    const bodyToUse = {
      accessToken: accessToken,
      ...replyDefinition,
    };
    var observableToUse = isUpdating
      ? this.replybotService.updateReplyDefinition(bodyToUse)
      : this.replybotService.createReplyDefinition(bodyToUse);

    observableToUse.pipe(take(1)).subscribe({
      next: (_) => {
        this.snackbarService.showSnackBar('Reply Definition Saved', false);
        setTimeout(() => {
          this.router.navigate(['bots/replybot/reply-definitions'], {
            queryParams: { guildId: this.guildId },
          });
        }, 3000);
      },
      error: (error) => {
        this.isSaving = false;
        this.snackbarService.showSnackBar('Error saving reply definition', true);
        console.error('error saving', error);
      },
    });
  }

  openHelpDialog() {
    this.showHelpDialog = true; // Set flag to true to show the modal
  }

  closeHelpDialog() {
    this.showHelpDialog = false; // Set flag to false to hide the modal
  }
}
