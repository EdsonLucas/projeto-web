import { User } from 'src/app/shared/user.model';


export class Message {
  content: string;
  messageId: string;
  usuarioNome: User;
  createdAt: string;
  updatedAt: string;
  username?: string;
  userId?: string;

  constructor(
    content: string,
    messageId: string,
    usuarioNome: User,
    createdAt: string,
    updatedAt: string,
    username?: string,
    userId?: string,
  ) {
    this.content = content;
    this.messageId = messageId;
    this.usuarioNome = usuarioNome;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.username = username;
    this.userId = userId;
  }
}
