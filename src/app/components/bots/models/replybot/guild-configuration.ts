export class GuildConfiguration {
  public guildId: string;
  public guildName: string;
  public enableAvatarAnnouncements: boolean;
  public enableAvatarMentions: boolean;
  public logChannelId?: string;
  public adminUserIds: string[];
}
