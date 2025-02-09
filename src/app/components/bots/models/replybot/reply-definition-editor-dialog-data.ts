import { DiscordUser } from "../discord-user";

export class ReplyDefinitionEditorEditorData {
  public id?: number;
  public guildId: string;
  public triggers?: string[];
  public replies?: string[];
  public channelIds?: string[];
  public userIds?: string[];
  public mentionAuthor?: boolean;
  public requiresBotName?: boolean;
  public reactions?: string[];
  public isActive?: boolean;
  public user?: DiscordUser;
}
