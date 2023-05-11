import { Component } from '@angular/core';
import {MessageService} from "../app/Services/message.service";


type Message = {
  content: string;
  from: string;
  timestamp: Date;
};

@Component({
  selector: 'app-chat-input',
  template: `
    <div class="bg-white p-4">
      <form (ngSubmit)="sendMessage()" class="flex">
        <input [(ngModel)]="message" name="message" type="text" placeholder="Type your message here..." class="w-full px-2 py-1 border-gray-300 border rounded-md mr-2">
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Send</button>
      </form>
    </div>
  `,
})
export class ChatInputComponent {
  message: string = '';
  constructor(private messageService: MessageService) {}
  sendMessage() {
    const from = 'me';
    const timestamp = new Date();

    const newMessage: Message = { content: this.message, from, timestamp };
    this.messageService.addMessage(newMessage);

    // Дополнительная логика, например, обновление списка сообщений или отправка на сервер

    // Очистка поля ввода сообщения
    this.message = '';
  }
}
