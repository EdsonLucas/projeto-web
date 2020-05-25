import { Component, OnInit } from '@angular/core';
import { Message } from './../model/message.model';
import { MessageService } from '../service/message.service';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { GithubService } from '../../github/github.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  userDetails;
  info = <any>[];

  constructor(
    private userService: UserService,
    private router: Router,
    private messageService: MessageService,
    private githubService: GithubService
  ) {}


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
        var str = this.userDetails.fullName.indexOf(" ", this.userDetails.fullName.indexOf(" ") + 1);
        var removeFullName = this.userDetails.fullName.substring(0, str);
        var result = removeFullName.replace(/\s/g, '');

        this.userDetails.fullName = result;

        this.githubService.getData(this.userDetails.fullName).subscribe((data) => {
          this.info = data;
          this.info['name'] = removeFullName;
        })
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
