export class GuildConfiguration {
  public guildId: string;
  public guildName: string;
  public enableAvatarAnnouncements: boolean;
  public enableAvatarMentions: boolean;
  public logChannelId?: string;
  public adminUserIds: string[];
  public enableDefaultReplies: boolean;
  public enableFixTweetReactions: boolean;
  public enableFixInstagramReactions: boolean;
  public enableFixRedditReactions: boolean;
  public enableFixThreadsReactions: boolean;
  public enableFixBlueskyReactions: boolean;
  public enableFixTikTokReactions: boolean;
  public ignoreAvatarChangesUserIds: string[];
  public enableWelcomeMessage: boolean;
  public enableDepartureMessage: boolean;
  public enableLoggingUserJoins: boolean;
  public enableLoggingUserDepartures: boolean;
  public enableLoggingMessageEdits: boolean;
  public enableLoggingMessageDeletes: boolean;
  public enableLoggingUserBans: boolean;
  public enableLoggingUserUnBans: boolean;
  public fortniteMapOnlyNamedLocations: boolean;
  public enableRepeatLinkNotifications: boolean;
  public enableChannelUpdateAnnouncements: boolean;
}
