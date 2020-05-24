import { Component, OnInit } from '@angular/core';
import { MessageService } from './../service/message.service';
import { Message } from './../model/message.model';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css'],
})
export class MessageInputComponent implements OnInit {
  constructor(private messageService: MessageService) {}
  user: User;

  messageLoad: Message;

  onSubmit(form: NgForm) {
    if (this.messageLoad) {
      this.messageLoad[0].content = form.value.myContentngForm;
      this.messageService.updateMessage(this.messageLoad).subscribe(
        (dadosSucesso) => console.log(dadosSucesso),
        (dadosErro) => console.log(dadosErro)
      );
      this.messageLoad = null;
    } else {
      const messageAux = new Message(form.value.myContentngForm, '', this.user, '', '', '', '');
      this.messageService.addMessage(messageAux).subscribe(
        (dadosSucesso) => console.log(dadosSucesso),
        (dadosErro) => console.log(dadosErro)
      );
      form.resetForm();
    }
  }
  onSave(textConsole: string) {
    const messageAux = new Message(textConsole, '', this.user, '', '', '', '');
    this.messageService.addMessage(messageAux);
  }
  ngOnInit() {
    this.messageService.messageIsEdit.subscribe(
      (message: Message) => (this.messageLoad = message)
    );
  }
  onClear(form: NgForm) {
    this.messageLoad = null;
    form.resetForm();
  }
}
