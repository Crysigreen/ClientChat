import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ChatService} from "./chat.service";


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private chatService: ChatService ) {}

}
