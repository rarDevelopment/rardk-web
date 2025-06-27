import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ReplyDefinition } from '../models/replybot/reply-definition';
import { Observable, of } from 'rxjs';
import { GuildConfiguration } from '../models/replybot/guild-configuration';

@Injectable({
  providedIn: 'root',
})
export class ReplybotService extends ApiService {
  public getReplybotReplyDefinitions(
    discordAccessToken: string,
    guildId: string
  ): Observable<ReplyDefinition[]> {
    return this.http.get<ReplyDefinition[]>(
      `${this.domainUrl}replybot/reply-definitions?accessToken=${discordAccessToken}&guildId=${guildId}`
    );
  }

  public getReplybotReplyDefinition(
    discordAccessToken: string,
    guildId: string,
    replyDefinitionId: string
  ): Observable<ReplyDefinition | null> {
    if (!replyDefinitionId) {
      return of(null);
    }
    return this.http.get<ReplyDefinition>(
      `${this.domainUrl}replybot/reply-definition?accessToken=${discordAccessToken}&guildId=${guildId}&replyDefinitionId=${replyDefinitionId}`
    );
  }

  public deleteReplyDefinition(
    discordAccessToken: string,
    replyDefinitionId: number
  ): Observable<ReplyDefinition[]> {
    return this.http.delete<ReplyDefinition[]>(
      `${this.domainUrl}replybot/reply-definition?accessToken=${discordAccessToken}&replyDefinitionId=${replyDefinitionId}`
    );
  }

  public createReplyDefinition(bodyToUse: any): Observable<ReplyDefinition> {
    return this.http.post<ReplyDefinition>(`${this.domainUrl}replybot/reply-definition`, bodyToUse);
  }

  public updateReplyDefinition(bodyToUse: any): Observable<ReplyDefinition> {
    return this.http.put<ReplyDefinition>(`${this.domainUrl}replybot/reply-definition`, bodyToUse);
  }

  public movePriority(
    discordAccessToken: string,
    replyDefinition: ReplyDefinition,
    direction: string
  ) {
    return this.http.put<ReplyDefinition[]>(
      `${this.domainUrl}replybot/reply-definition/${direction.toLowerCase()}`,
      {
        accessToken: discordAccessToken,
        ...replyDefinition,
      }
    );
  }

  public getReplybotGuildConfigurations(
    discordAccessToken: string
  ): Observable<GuildConfiguration[]> {
    return this.http.get<GuildConfiguration[]>(
      `${this.domainUrl}replybot/config/all?accessToken=${discordAccessToken}`
    );
  }

  public getReplybotGuildConfiguration(
    discordAccessToken: string,
    guildId: string
  ): Observable<GuildConfiguration> {
    return this.http.get<GuildConfiguration>(
      `${this.domainUrl}replybot/config/?accessToken=${discordAccessToken}&guildId=${guildId}`
    );
  }

  public updateReplybotGuildConfiguration(
    updatedConfiguration: any
  ): Observable<GuildConfiguration> {
    return this.http.put<GuildConfiguration>(
      `${this.domainUrl}replybot/config`,
      updatedConfiguration
    );
  }
}
