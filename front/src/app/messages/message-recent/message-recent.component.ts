import { Component, Input } from '@angular/core';
import { Message } from './../model/message.model';

@Component({
  selector: 'app-message-recent',
  templateUrl: './message-recent.component.html',
  styleUrls: ['./message-recent.component.css'],
})
export class MessageRecentComponent {
  today = Date.now();
  fixedTimezone = this.today;

  @Input() messages: Message[];
}
