import { Component, OnInit } from '@angular/core';
import { DiscordGuild } from 'src/app/components/bots/models/discord-guild';
import { BotPageComponent } from '../../bot-page/bot-page.component';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { GuildConfiguration } from 'src/app/components/bots/models/replybot/guild-configuration';

import { PageTitleComponent } from '../../../shared/page-title/page-title.component';
import { LoadingIndicatorComponent } from 'src/app/components/shared/loading-indicator/loading-indicator.component';

@Component({
    selector: 'app-guild-selector',
    templateUrl: './replybot-server-selector.component.html',
    styleUrls: ['./replybot-server-selector.component.scss'],
    imports: [PageTitleComponent, LoadingIndicatorComponent]
})
export class ReplybotServerSelectorComponent extends BotPageComponent implements OnInit {
  public isLoading = false;
  public discordGuilds: DiscordGuild[] = [];

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      const accessToken = this.authService.getLoginToken();
      this.isLoading = true;

      forkJoin([
        this.discordService.getDiscordGuilds(accessToken!),
        this.replybotService.getReplybotGuildConfigurations(accessToken!),
      ])
        .pipe(
          map(([userGuilds, replybotGuildConfigurations]) => {
            return { userGuilds, replybotGuildConfigurations };
          })
        )
        .subscribe({
          next: (result: {
            userGuilds: DiscordGuild[];
            replybotGuildConfigurations: GuildConfiguration[];
          }) => {
            if (result && result.userGuilds && result.replybotGuildConfigurations) {
              this.discordGuilds = result.userGuilds
                .filter((ug) => {
                  return result.replybotGuildConfigurations.find((r) => r.guildId == ug.id);
                })
                .sort((g1: DiscordGuild, g2: DiscordGuild) => {
                  return g1.name.toLowerCase() > g2.name.toLowerCase() ? 1 : -1;
                });
              this.isLoading = false;
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
  }
}
