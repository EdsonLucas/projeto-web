export class Message {
  content: string;
  messageId: string;
  username?: string;
  userId?: string;
  createdAt: string;
  updatedAt: string;

  constructor(
    content: string,
    messageId: string,
    createdAt: string,
    updatedAt: string,
    username?: string,
    userId?: string,
  ) {
    this.content = content;
    this.messageId = messageId;
    this.username = username;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
