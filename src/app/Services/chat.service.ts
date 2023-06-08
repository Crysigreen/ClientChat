import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import * as signalR from '@aspnet/signalr';
import {AuthService} from "./auth.service";
import {map, Observable, of, Subject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ChatHistory} from "../Models/chat-history";



export interface ChatMessage {
  content: string;
  from: string;
  to: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // private hubConnection!: HubConnection;
  private hubConnection!: signalR.HubConnection;
  //private chats: { [key: string]: { messages: ChatMessage[], subject: Subject<ChatMessage[]> } } = {};
  private chats: { [key: string]: { messages: ChatMessage[], subject: Subject<ChatMessage> } } = {};

  private apiUrl = 'https://localhost:7185/api/Chat';

  constructor(private authService: AuthService, private http: HttpClient) { }

  public startConnection(username: string): Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7185/chatHub?username=${encodeURIComponent(username)}`)
      .build();

    this.hubConnection.on('ReceiveMessage', (data) => {
      const message: ChatMessage = {
        content: data.content,
        from: data.from,
        to: data.to,
        timestamp: new Date(data.timestamp)
      };

      if (!this.chats[data.from]) {
        this.chats[data.from] = { messages: [], subject: new Subject<ChatMessage>() };
      }

      this.chats[data.from].messages.push(message);
      this.chats[data.from].subject.next(message);
    });



    return this.hubConnection.start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  // private selectedUserSubject = new Subject<string>();
  // selectedUser$ = this.selectedUserSubject.asObservable();
  //
  // public selectUser(username: string): void {
  //   this.selectedUserSubject.next(username);
  // }

  public sendMessage(receiverUsername: string, message: string): void {
    const myMessage: ChatMessage = {
      content: message,
      from: this.authService.MyUsername,  // предполагается, что MyId хранит ваше имя пользователя
      to: receiverUsername,
      timestamp: new Date(),
    };

    this.hubConnection.invoke('SendMessage', receiverUsername, message).catch(err => console.error(err));

    if (!this.chats[receiverUsername]) {
      this.chats[receiverUsername] = { messages: [], subject: new Subject<ChatMessage>() };
    }

    this.chats[receiverUsername].messages.push(myMessage);
    this.chats[receiverUsername].subject.next(myMessage);
  }

  // public getChatHistory(username: string): Observable<ChatMessage[]> {
  //   if (!this.chats[username]) {
  //     this.chats[username] = { messages: [], subject: new Subject<ChatMessage[]>() };
  //   }
  //
  //   // Return a copy of the chat history
  //   return of([...this.chats[username].messages]);
  // }

  public getChatHistoryDB(username: string, friend: string, pageIndex: number, pageSize: number): Observable<ChatMessage[]> {
    const params = new HttpParams()
      .set('senderUsername', username)
      .set('friendUsername', friend)
      .set('pageIndex', pageIndex)
      .set('pageSize', pageSize);
    return this.http.get<ChatHistory[]>(`${this.apiUrl}/GetChatHistory`,{params},)
      .pipe(map(messages => messages.map(m => ({
        content: m.content,
        from: m.from,
        to: m.to,
        timestamp: new Date(m.timestamp)
      }))));
  }

  public getChatUpdates(username: string): Subject<ChatMessage> {
    if (!this.chats[username]) {
      this.chats[username] = { messages: [], subject: new Subject<ChatMessage>() };
    }

    // Return the subject that will be updated with new messages
    return this.chats[username].subject;
  }

  // public getChatHistory(username: string): Subject<ChatMessage[]> {
  //   if (!this.chats[username]) {
  //     this.chats[username] = { messages: [], subject: new Subject<ChatMessage[]>() };
  //   }
  //
  //   return this.chats[username].subject;
  // }
}
