import { Injectable } from '@angular/core';
import {MessageHistory} from "../Models/message-history";
import {HttpClient} from "@angular/common/http";
import {ChatService} from "./chat.service";

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
  public currentChatHistory: MessageHistory[] = [];

  constructor(private chatService: ChatService ) {}

  getMessages(): MessageHistory[] {
    return this.currentChatHistory;
  }

  // addMessage(message: MessageHistory[]) {
  //   this.messages.push(message);
  // }

  // public selectChat(friendUsername: string): void {
  //   this.currentChatHistory = this.chatService.getChatHistory(friendUsername);
  //
  // }

}
