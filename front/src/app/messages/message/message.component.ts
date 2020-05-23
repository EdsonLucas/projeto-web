import { Message } from './../model/message.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent {
  constructor(private messageService: MessageService) {}
  today = Date.now();
  fixedTimezone = this.today;

  @Input() messages: Message = new Message('', '', '', '');
  @Output() editClicked_Message = new EventEmitter<string>();

  onEditService(messageId) {
    this.messageService.editMessage(this.messages, messageId);
  }

  onDeleteService(messageId) {
    this.messageService.deleteMessage(messageId).subscribe(
      (dadosSucesso) => (dadosSucesso),
      (dadosErro) => console.log(dadosErro)
    );
  }
}
