import { DiscordUser } from '../discord-user';

export class ReplyDefinitionEditorData {
  public id?: number;
  public guildId: string;
  public triggers: string[] = [];
  public replies: string[] = [];
  public channelIds: string[] = [];
  public userIds: string[] = [];
  public mentionAuthor: boolean = false;
  public requiresBotName: boolean = false;
  public reactions: string[] = [];
  public isActive?: boolean = true;
  public user?: DiscordUser;
}
