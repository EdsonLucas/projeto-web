import { Component, OnInit } from '@angular/core';
import { Message } from './../model/message.model';
import { MessageService } from '../service/message.service';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) {}

  userDetails;


  ngOnInit(): void {
    this.messageService.getMessages().subscribe(
      (dadosSucesso: Message[]) => {
        this.messages = dadosSucesso;
        console.log(dadosSucesso);
      },
      (dadosErro) => {
        console.log('error get messages');
        console.log(dadosErro);
      }
    );

    this.userService.getUserProfile().subscribe(
      (res) => {
        this.userDetails = res['user'];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
}
