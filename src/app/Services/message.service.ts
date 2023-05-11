import { Injectable } from '@angular/core';

type Message = {
  content: string;
  from: string;
  timestamp: Date;
};

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messages: Message[] = [];

  getMessages(): Message[] {
    return this.messages;
  }

  addMessage(message: Message) {
    this.messages.push(message);
  }

}
