import { Component } from '@angular/core';
import {MessageService} from "../app/Services/message.service";
import {HubConnectionBuilder} from "@microsoft/signalr";


type Message = {
  content: string;
  from: string;
  timestamp: Date;
};

@Component({
  selector: 'app-chat-input',
  template: `
    <div class="bg-[#202329] p-4">
      <form (ngSubmit)="sendMessage()" class="flex">
        <input [(ngModel)]="message" name="message" type="text" placeholder="Your message"
               class="w-full bg-[#202329] px-2 py-1 outline-0 text-gray-200 rounded-md">
        <button type="submit" class="px-4 py-2 rounded-md">
          <img src="../assets/send.png" alt="video call" class="w-6 h-6">
        </button>
      </form>
    </div>
  `,
})
export class ChatInputComponent {

  private hubConnection: any;

  ngOnInit() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5252/chatHub') // Укажите URL-адрес вашего SignalR хаба
      .build();

    this.hubConnection.start().then(() => {
      console.log('SignalR connection started');
    }).catch((err: any) => console.error(err));

    this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
      // Обработка полученного сообщения
      console.log(user + ' sent a message: ' + message);
    });
  }

// Отправка сообщения
//   sendMessage(user: string, message: string) {
//     const from = 'me';
//     const timestamp = new Date();
//     const newMessage: Message = { content: this.message, from, timestamp };
//     this.messageService.addMessage(newMessage);
//
//     this.hubConnection.invoke('SendMessage', user, message);
//
//     this.message = '';
//   }

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
