import { Component, OnInit } from '@angular/core';
import { DiscordGuild } from 'src/app/models/bots/discord-guild';
import { PageComponent } from '../../../page/page.component';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { GuildConfiguration } from 'src/app/models/bots/replybot/guild-configuration';

@Component({
  selector: 'app-guild-selector',
  templateUrl: './replybot-server-selector.component.html',
  styleUrls: ['./replybot-server-selector.component.css'],
})
export class ReplybotServerSelectorComponent
  extends PageComponent
  implements OnInit
{
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
            if (
              result &&
              result.userGuilds &&
              result.replybotGuildConfigurations
            ) {
              this.discordGuilds = result.userGuilds
                .filter((ug) => {
                  return result.replybotGuildConfigurations.find(
                    (r) => r.guildId == ug.id
                  );
                })
                .sort((g1: DiscordGuild, g2: DiscordGuild) => {
                  return g1.name.toLowerCase() > g2.name.toLowerCase() ? 1 : -1;
                });
              this.isLoading = false;
            }
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
  }
}
