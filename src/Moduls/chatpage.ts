import {Component} from "@angular/core";
import {MessageService} from "../app/Services/message.service";


type Message = {
  content: string;
  from: string;
  timestamp: Date;
};

@Component({
  selector: 'app-chat-window',
  template: `
    <div class="bg-gray-100 flex flex-col h-full">
      <div class="bg-white border-b border-gray-300 h-16 px-5 py-5 flex justify-between items-center">
        <div class="font-bold text-gray-600">{{ chatPartner }}</div>
        <div>
          <button class="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-full mr-2"><img src="../assets/CallIcon.svg" alt="video call" class="w-6 h-6"></button>
          <button class="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-full"><img src="../assets/CallIcon.svg" alt="call" class="w-6 h-6"></button>
        </div>
      </div>
      <div class="flex-1 overflow-y-scroll px-4 py-2 content-end">
        <div *ngFor="let message of messages">
          <div [ngClass]="{ 'ml-auto': message.from === 'me' }" class="bg-white rounded-lg p-2 mb-2 w-3/4">
            <div class="text-gray-600">{{ message.content }}</div>
            <div class="text-xs text-gray-400">{{ message.timestamp | date:'shortTime' }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ChatWindowComponent {
  messages: Message[] = [];
  constructor(private messageService: MessageService) {}
  ngOnInit() {
    this.messages = this.messageService.getMessages();
  }
  chatPartner: string = 'Alice';
  /*messages: { content: string, from: string, timestamp: Date }[] = [    { content: 'Hi, how are you?', from: 'me', timestamp: new Date() },    { content: 'I\'m good, thanks. How about you?', from: 'Alice', timestamp: new Date() },    { content: 'I\'m doing well, thanks for asking.', from: 'me', timestamp: new Date() },  ];
*/}
