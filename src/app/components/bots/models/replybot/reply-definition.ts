export class ReplyDefinition {
  public id: number;
  public guildId: string;
  public triggers: string[];
  public replies: string[];
  public channelIds: string[];
  public userIds: string[];
  public mentionAuthor: boolean;
  public requiresBotName: boolean;
  public reactions: string[];
  public priority: number;
  public isActive: boolean;
  public editingUserId: string; //for saving
  public editingUsername: string; //for saving
  public createdById: string; //for retrieving
  public createdByUsername: string; //for retrieving
  public updatedById: string; //for retrieving
  public updatedByUsername: string; //for retrieving
  public createdDate: string; //for retrieving
  public updatedDate: string; //for retrieving
}
