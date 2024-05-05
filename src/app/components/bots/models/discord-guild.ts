import { DiscordGuildPermissions } from './discord-guild-permissions';

export class DiscordGuild {
  public createdAt: string;
  public iconUrl: string;
  public id: string;
  public isOwner: boolean;
  public name: string;
  public permissions: DiscordGuildPermissions;
}
