import { Injectable } from '@angular/core';
import { DiscordGuild } from '../components/bots/models/discord-guild';
import { ApiService } from './api.service';
import { GuildMember } from '../components/bots/models/replybot/guild-member';
import { Observable } from 'rxjs';
import { DiscordAuthResponse } from '../components/bots/models/discord-auth-response';
import { DiscordUser } from '../components/bots/models/discord-user';

@Injectable({
  providedIn: 'root',
})
export class DiscordService extends ApiService {
  public getAccessToken(code: string) {
    const callbackUrl = window.location.protocol + '//' + window.location.host;
    return this.http.get<DiscordAuthResponse>(
      `${this.domainUrl}discord/access-token?code=${code}&redirectUrl=${callbackUrl}/callback`
    );
  }

  public refreshAccessToken(refreshToken: string) {
    return this.http.get<DiscordAuthResponse>(
      `${this.domainUrl}discord/access-token?refreshToken=${refreshToken}`
    );
  }

  public getDiscordGuilds(accessToken: string) {
    return this.http.get<DiscordGuild[]>(
      `${this.domainUrl}discord/guilds?accessToken=${accessToken}`
    );
  }

  public getDiscordUser(accessToken: string) {
    return this.http.get<DiscordUser>(
      `${this.domainUrl}discord/user?accessToken=${accessToken}`
    );
  }

  public getDiscordUserGuildMember(
    accessToken: string,
    guildId: string
  ): Observable<GuildMember> {
    return this.http.get<GuildMember>(
      `${this.domainUrl}discord/guild-member?accessToken=${accessToken}&guildId=${guildId}`
    );
  }
}
