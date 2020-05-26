import { Component, OnInit } from '@angular/core';
import { Message } from './../model/message.model';
import { MessageService } from '../service/message.service';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { GithubService } from '../../github/github.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  userDetails;
  info = <any>[];
  usersGithub = {};

  constructor(
    private userService: UserService,
    private router: Router,
    private messageService: MessageService,
    private githubService: GithubService
  ) {}


  ngOnInit(): void {
    this.CarregarMensagem()
    setInterval(() => this.CarregarMensagem(), 1000);

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

  CarregarMensagem() {
    this.messageService.getMessages().subscribe(
      (dadosSucesso: Message[]) => {
        dadosSucesso.filter(x => !this.messages.map(x => x.messageId).includes(x.messageId)).forEach(message => {
          this.userService.getUser(message.userId).subscribe((user: any) => {
            message.username = user.user.fullName.split(' ').splice(0, 2).join(' ');

            this.githubService.getData(message.username.replace(' ', '')).subscribe((data) => {
              this.usersGithub[message.userId] = data.avatar_url;
            })

            this.messages.push(message);
            this.messages.sort((a, b) => {
              if(a.createdAt.valueOf() < b.createdAt.valueOf()) {
                return -1;
              }

              return 1
            });
          })
        })
      },
      (dadosErro) => {
        console.log(dadosErro);
      }
    );
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
}
