import { Message } from './../model/message.model';
import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MessageService } from '../service/message.service';
import { UserService } from '../../shared/user.service';
import { GithubService } from '../../github/github.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent {
  constructor(private messageService: MessageService, private userService: UserService, private githubService: GithubService) {}

  messageEditId;

  @Input() usersGithub;
  @Input() user: any;
  @Input() messages: Message[];
  @Output() editClicked_Message = new EventEmitter<string>();



  onMessageHover(messageId: string) {
    this.messageEditId = messageId;
    setTimeout(() => {
      this.messageEditId = null;
    }, 5000);
  }

  onEditService(messageId) {
    this.messageService.editMessage(messageId);
  }

  onDeleteService(messageId) {
    this.messageService.deleteMessage(messageId).subscribe(
      (dadosSucesso) => (dadosSucesso),
      (dadosErro) => console.log(dadosErro)
    );
  }
}
