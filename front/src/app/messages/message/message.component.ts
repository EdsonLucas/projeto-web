import { Message } from './../model/message.model';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MessageService } from '../service/message.service';
import { UserService } from '../../shared/user.service';
import { GithubService } from '../../github/github.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  constructor(private messageService: MessageService, private userService: UserService, private githubService: GithubService) {}
  today = Date.now();
  fixedTimezone = this.today;

  info: string;
  userDetails;

  @Input() messages: Message = new Message('', '', '', '');
  @Output() editClicked_Message = new EventEmitter<string>();

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      (res) => {
        this.userDetails = res['user'];
        var str = this.userDetails.fullName.indexOf(" ", this.userDetails.fullName.indexOf(" ") + 1);
        var removeFullName = this.userDetails.fullName.substring(0, str);
        var result = removeFullName.replace(/\s/g, '');

        this.userDetails.fullName = removeFullName;

        this.githubService.getData(result).subscribe((data) => {
          this.info = data.avatar_url;
        })
      },
      (err) => {
        console.log(err);
      }
    );
  }

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
