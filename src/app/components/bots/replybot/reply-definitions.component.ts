import { Component, OnInit } from '@angular/core';
import { BotPageComponent } from '../bot-page/bot-page.component';
import { ReplyDefinition } from 'src/app/models/bots/replybot/reply-definition';
import { take, forkJoin, timeout, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ReplyDefinitionEditorDialogComponent } from './reply-definition-editor-dialog/reply-definition-editor-dialog.component';
import { ReplyDefinitionEditorDialogData } from 'src/app/models/bots/replybot/reply-definition-editor-dialog-data';
import { DiscordGuild } from 'src/app/models/bots/discord-guild';
import { GuildConfiguration } from 'src/app/models/bots/replybot/guild-configuration';
import { ReplyDefinitionAttributeType } from 'src/app/models/bots/replybot/reply-definition-filter-type';
import { DiscordUser } from 'src/app/models/bots/discord-user';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PageTitleComponent } from '../../shared/page-title/page-title.component';
import { NgIf, NgFor, NgClass, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CheckOrXComponent } from '../../shared/check-or-x/check-or-x.component';
import { LoadingIndicatorComponent } from '../../shared/loading-indicator/loading-indicator.component';

@Component({
  selector: 'app-reply-definitions',
  templateUrl: './reply-definitions.component.html',
  styleUrls: ['./reply-definitions.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    PageTitleComponent,
    MatButtonToggleModule,
    FormsModule,
    NgFor,
    MatExpansionModule,
    NgClass,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    CheckOrXComponent,
    DatePipe,
    RouterLink,
    LoadingIndicatorComponent,
  ],
})
export class ReplyDefinitionsComponent
  extends BotPageComponent
  implements OnInit
{
  isLoading: boolean;
  replyDefinitions: ReplyDefinition[] = [];
  filteredReplyDefinitions: ReplyDefinition[] = [];
  guildId: string;
  guildName: string;
  domainUrl: string;
  isAuthorizedToAdministrate: boolean = false;
  filterOptionsPanelOpenState: boolean;
  filterOptions: ReplyDefinitionAttributeType[] = [];
  toolTipMaxLength = 100;
  panelOpenStates: boolean[] = [];
  filterTypes: ReplyDefinitionAttributeType[];
  replyDefinitionToDelete?: ReplyDefinition;
  discordUser: DiscordUser;

  attributeIsActive: ReplyDefinitionAttributeType = {
    key: 'isActive',
    displayName: 'Active',
    filter: (gr) => gr.isActive,
    valueDisplayText: (gr) => '',
    showAsFilter: true,
    showAsAttribute: false,
  };

  attributeIsInactive: ReplyDefinitionAttributeType = {
    key: 'isInactive',
    displayName: 'Inactive',
    filter: (gr) => !gr.isActive,
    valueDisplayText: (gr) => '',
    showAsFilter: true,
    showAsAttribute: false,
  };

  attributeHasReplies: ReplyDefinitionAttributeType = {
    key: 'hasReplies',
    displayName: 'Replies',
    filter: (gr) => gr.replies && gr.replies.length > 0,
    valueDisplayText: (gr) => {
      if (!gr.replies || gr.replies.length === 0) {
        return '';
      }
      const repliesString = gr.replies.join(',');
      if (repliesString.length > this.toolTipMaxLength) {
        return repliesString.substring(0, this.toolTipMaxLength - 3) + '...';
      }
      return repliesString;
    },
    showAsFilter: true,
    showAsAttribute: true,
  };

  attributeHasReactions: ReplyDefinitionAttributeType = {
    key: 'hasReactions',
    displayName: 'Reactions',
    filter: (gr) => gr.reactions && gr.reactions.length > 0,
    valueDisplayText: (gr) => {
      if (!gr.reactions || gr.reactions.length === 0) {
        return '';
      }
      const reactionsString = gr.reactions.join(',');
      if (reactionsString.length > this.toolTipMaxLength) {
        return reactionsString.substring(0, this.toolTipMaxLength - 3) + '...';
      }
      return reactionsString;
    },
    showAsFilter: true,
    showAsAttribute: true,
  };

  attributeHasChannelIds: ReplyDefinitionAttributeType = {
    key: 'hasChannelIds',
    displayName: 'Channels',
    filter: (gr) => gr.channelIds && gr.channelIds.length > 0,
    valueDisplayText: (gr) => {
      if (!gr.channelIds || gr.channelIds.length === 0) {
        return '';
      }
      return `${gr.channelIds.length} channel(s)`;
    },
    showAsFilter: true,
    showAsAttribute: true,
  };

  attributeHasUserIds: ReplyDefinitionAttributeType = {
    key: 'hasUserIds',
    displayName: 'Users',
    filter: (gr) => gr.userIds && gr.userIds.length > 0,
    valueDisplayText: (gr) => {
      if (!gr.userIds || gr.userIds.length === 0) {
        return '';
      }
      return `${gr.userIds.length} user(s)`;
    },
    showAsFilter: true,
    showAsAttribute: true,
  };

  ngOnInit() {
    this.filterTypes = [
      this.attributeIsActive,
      this.attributeIsInactive,
      this.attributeHasReplies,
      this.attributeHasReactions,
      this.attributeHasChannelIds,
      this.attributeHasUserIds,
    ];

    if (this.isLoggedIn()) {
      this.domainUrl = window.location.host;
      this.initializePageContents();
    }
  }

  private initializePageContents() {
    this.isLoading = true;
    this.clearFilters();
    this.clearOpenStates();
    this.route.queryParams
      .pipe(
        take(1),
        switchMap((params) => {
          this.guildId = params['guildId'];
          const accessToken = this.getLoginToken();
          return forkJoin([
            this.replybotService.getReplybotReplyDefinitions(
              accessToken!,
              this.guildId
            ),
            this.discordService.getDiscordGuilds(accessToken!),
            this.replybotService.getReplybotGuildConfiguration(
              accessToken!,
              this.guildId
            ),
            this.discordService.getDiscordUser(accessToken!),
          ]).pipe(
            timeout({
              each: 10000,
              with: () =>
                throwError(
                  () =>
                    new Error(
                      'Timed out waiting for response, logging out to renew access token.'
                    )
                ),
            }),
            map(
              ([
                replyDefinitions,
                discordGuilds,
                guildConfiguration,
                discordUser,
              ]) => {
                return {
                  replyDefinitions,
                  discordGuilds,
                  guildConfiguration,
                  discordUser,
                };
              }
            )
          );
        })
      )
      .subscribe({
        next: (result: {
          replyDefinitions: ReplyDefinition[];
          discordGuilds: DiscordGuild[];
          guildConfiguration: GuildConfiguration;
          discordUser: DiscordUser;
        }) => {
          const currentGuild = result.discordGuilds.find(
            (g) => g.id === this.guildId
          );
          if (currentGuild) {
            this.guildName = currentGuild.name;
            this.isAuthorizedToAdministrate =
              currentGuild.permissions.administrator;
          }
          result.guildConfiguration.adminUserIds.forEach((adminUserId) => {
            if (result.discordUser.id === adminUserId) {
              this.isAuthorizedToAdministrate = true;
            }
          });

          this.populateReplyDefinitions(result.replyDefinitions);
          this.discordUser = result.discordUser;
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.showSnackBar(
            'Error retrieving page data. Login may have expired, please log in and try again.',
            true
          );
          window.setTimeout(() => this.logOutAndRedirect(), 3000);
        },
      });
  }

  retrieveAndPopulateReplyDefinitions() {
    this.isLoading = true;
    const accessToken = this.getLoginToken();
    this.clearFilters();
    this.clearOpenStates();
    this.replybotService
      .getReplybotReplyDefinitions(accessToken!, this.guildId)
      .pipe(take(1))
      .subscribe({
        next: (replyDefinitions) => {
          this.populateReplyDefinitions(replyDefinitions);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error retrieving server replies', error);
          this.showSnackBar('Error Retrieiving Reply Definitions', true);
        },
      });
  }

  populateReplyDefinitions(replyDefinitions: ReplyDefinition[]) {
    if (replyDefinitions) {
      const sortedreplyDefinitions = replyDefinitions.sort(
        (g1, g2) => g1.priority - g2.priority
      );
      this.replyDefinitions = sortedreplyDefinitions;
      this.filteredReplyDefinitions = sortedreplyDefinitions;
    }
  }

  addNewReplyDefinition() {
    this.openEditDialog({
      guildId: this.guildId,
      isActive: true,
    } as ReplyDefinitionEditorDialogData);
  }

  getFilters() {
    return this.filterTypes.filter((f) => f.showAsFilter);
  }

  getAttributes() {
    return this.filterTypes.filter((f) => f.showAsAttribute);
  }

  startEdit(replyDefinition: ReplyDefinition) {
    const dialogData = {
      id: replyDefinition.id,
      guildId: replyDefinition.guildId,
      mentionAuthor: replyDefinition.mentionAuthor,
      reactions: replyDefinition.reactions,
      replies: replyDefinition.replies,
      requiresBotName: replyDefinition.requiresBotName,
      triggers: replyDefinition.triggers,
      channelIds: replyDefinition.channelIds,
      userIds: replyDefinition.userIds,
      isActive: replyDefinition.isActive,
    } as ReplyDefinitionEditorDialogData;

    this.openEditDialog(dialogData);
  }

  addFromCopy(replyDefinition: ReplyDefinition) {
    const dialogData = {
      guildId: replyDefinition.guildId,
      mentionAuthor: replyDefinition.mentionAuthor,
      reactions: replyDefinition.reactions,
      replies: replyDefinition.replies,
      requiresBotName: replyDefinition.requiresBotName,
      triggers: replyDefinition.triggers,
      channelIds: replyDefinition.channelIds,
      userIds: replyDefinition.userIds,
      isActive: replyDefinition.isActive,
    } as ReplyDefinitionEditorDialogData;

    this.openEditDialog(dialogData);
  }

  async addFromClipboard() {
    const clipboardValue = await navigator.clipboard.readText();

    try {
      const dialogData = JSON.parse(clipboardValue);
      dialogData.guildId = this.guildId;
      this.openEditDialog(dialogData);
    } catch (err) {
      console.error(err);
      this.showSnackBar(
        'Your clipboard data is not a valid reply definition!',
        true
      );
    }
  }

  copyJsonToClipboard(replyDefinition: ReplyDefinition) {
    const dialogData = {
      mentionAuthor: replyDefinition.mentionAuthor,
      reactions: replyDefinition.reactions,
      replies: replyDefinition.replies,
      requiresBotName: replyDefinition.requiresBotName,
      triggers: replyDefinition.triggers,
      isActive: replyDefinition.isActive,
    } as ReplyDefinitionEditorDialogData;

    if (this.clipboard.copy(JSON.stringify(dialogData))) {
      this.showSnackBar('Copied reply definition to clipboard!', false);
    } else {
      this.showSnackBar('There was a problem copying. Please try again.', true);
    }
  }

  showDeleteConfirm(replyDefinition: ReplyDefinition) {
    this.replyDefinitionToDelete = replyDefinition;
  }

  cancelDelete() {
    this.replyDefinitionToDelete = undefined;
  }

  doDelete() {
    if (this.replyDefinitionToDelete) {
      var accessToken = this.getLoginToken();
      this.replybotService
        .deleteReplyDefinition(accessToken!, this.replyDefinitionToDelete.id)
        .pipe(take(1))
        .subscribe({
          next: (_) => {
            this.retrieveAndPopulateReplyDefinitions();
            this.showSnackBar('Reply Definition Deleted', false);
          },
          error: (error) => {
            this.showSnackBar('Error deleting reply definition', true);
            console.error('error deleting', error);
          },
        });
    }
  }

  getOpen(index: number) {
    return this.panelOpenStates[index];
  }

  setOpen(index: number, isOpen: boolean) {
    this.panelOpenStates[index] = isOpen;
  }

  clearOpenStates() {
    this.panelOpenStates = [];
  }

  hasFilters(): boolean {
    return this.filterOptions.length > 0;
  }

  getActiveFilterDisplayNames(): string[] {
    return this.filterOptions.map((ft) => ft.displayName);
  }

  applyFilters() {
    this.clearOpenStates();
    if (this.filterOptions.length === 0) {
      this.filteredReplyDefinitions = this.replyDefinitions;
      return;
    }
    this.filteredReplyDefinitions = this.replyDefinitions.filter((gr) => {
      let filterResult = true;

      this.filterOptions.forEach((filter) => {
        filterResult = filterResult && filter.filter(gr);
      });

      return filterResult;
    });
  }

  clearFilters() {
    this.filterOptions = [];
    this.applyFilters();
  }

  private openEditDialog(dialogData?: ReplyDefinitionEditorDialogData) {
    // add editing user to dialog data
    if (dialogData) {
      dialogData.user = this.discordUser;
    } else {
      dialogData = {
        user: this.discordUser,
      } as ReplyDefinitionEditorDialogData;
    }

    // open dialog
    let dialogRef = this.dialog.open(ReplyDefinitionEditorDialogComponent, {
      height: '800px',
      width: '700px',
      data: dialogData,
    });
    dialogRef.afterClosed().subscribe((replyDefinitionToSave) => {
      if (replyDefinitionToSave) {
        this.saveReplyDefinition(replyDefinitionToSave);
      }
    });
  }

  movePriority(direction: string, replyDefinition: ReplyDefinition) {
    var accessToken = this.getLoginToken();
    this.replybotService
      .movePriority(accessToken!, replyDefinition, direction)
      .pipe(take(1))
      .subscribe((_) => {
        this.retrieveAndPopulateReplyDefinitions();
      });
  }

  saveReplyDefinition(replyDefinition: ReplyDefinition) {
    var accessToken = this.getLoginToken();

    const bodyToUse = {
      accessToken: accessToken,
      ...replyDefinition,
    };
    var observableToUse = replyDefinition.id
      ? this.replybotService.updateReplyDefinition(bodyToUse)
      : this.replybotService.createReplyDefinition(bodyToUse);

    observableToUse.pipe(take(1)).subscribe({
      next: (_) => {
        this.retrieveAndPopulateReplyDefinitions();
        this.showSnackBar('Reply Definition Saved', false);
      },
      error: (error) => {
        this.showSnackBar('Error saving reply definition', true);
        console.error('error saving', error);
      },
    });
  }
}
