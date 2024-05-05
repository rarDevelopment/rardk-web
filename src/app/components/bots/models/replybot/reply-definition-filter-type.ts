import { ReplyDefinition } from './reply-definition';

export class ReplyDefinitionAttributeType {
  public key: string;
  public displayName: string;
  public filter: (i: ReplyDefinition) => any;
  public valueDisplayText: (i: ReplyDefinition) => any;
  public showAsFilter: boolean;
  public showAsAttribute: boolean;
}
