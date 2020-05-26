export class Message {
  content: string;
  messageId: string;
  username?: string;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    content: string,
    messageId: string,
    username?: string,
    userId?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.content = content;
    this.messageId = messageId;
    this.username = username;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
