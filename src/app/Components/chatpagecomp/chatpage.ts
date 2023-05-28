import {Component, ElementRef, OnInit, QueryList, ViewChildren} from "@angular/core";
import {MessageService} from "../../Services/message.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {UserService} from "../../Services/user.service";
import {Users} from "../../Models/users";
import {ChatService} from "../../Services/chat.service";
import {AuthService} from "../../Services/auth.service";

type Message = {
  content: string;
  from: string;
  timestamp: Date;
};

@Component({
  selector: 'app-chat-window',
  template: `
    <div class="bg-[#202329] flex flex-col h-full">
      <div class="bg-[#202329] h-20 px-5 py-5 flex justify-between items-center">
        <div class="text-2xl font-bold text-white">{{ userName }}</div>
        <div class="space-x-5">
          <button class="px-2 py-1 rounded-full">
            <img src="../../../assets/phone.png" alt="video call" class="w-6 h-6">
          </button>
          <button class="px-2 py-1 rounded-full">
            <img src="../../../assets/dots-vertical.png" alt="call" class="w-6 h-6">
          </button>
        </div>
      </div>
      <div class="flex-grow overflow-y-auto px-4 py-2">
        <div *ngFor="let message of messages" class="flex justify-end" #messageElement>
          <div [ngClass]="{'ml-auto': message.from === 'me'}"
               class="bg-[#3d65ff] rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl px-4 py-2 mb-2 inline-block max-w-xs whitespace-normal break-words">
            <div class="text-white">{{ message.content }}</div>
            <div class="text-xs text-white">{{ message.timestamp | date:'hh:mm' }}</div>
          </div>
        </div>
      </div>
    </div>
  `

})
export class ChatWindowComponent implements OnInit {
  @ViewChildren('messageElement') messageElements!: QueryList<ElementRef>;
  messages: Message[] = [];
  userId!: string | null;
  constructor(private messageService: MessageService, private route: ActivatedRoute, private userService: UserService,private chatService: ChatService, private authService: AuthService) {}
  ngOnInit() {
    // this.chatService.startConnection(this.authService.username);
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.route.queryParamMap.subscribe((queryParams: ParamMap) => {
      this.userName = queryParams.get('username');
    });
    // this.chatService.receiveMessage((message: any) => {
    //   // Обработайте полученное сообщение
    //   console.log('Received message:', message);
    // });
    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   this.userId = params.get('userId');
    //   console.log('Opened chat with user ID:', this.userId);
    // });
    // this.getUserInfo();
    this.messages = this.messageService.getMessages();
    setTimeout(() => {
      this.scrollToBottom();
    }, 0);
  }
  scrollToBottom(): void {
    this.messageElements.changes.subscribe(() => {
      this.scrollToBottomSmooth();
    });
  }

  // getUserInfo(): void {
  //   if (this.userId) {
  //     this.userService.getUserById(this.userId)
  //       .subscribe((user: Users) => {
  //         this.userName = user.username; // Предположим, что в объекте User есть свойство name
  //       });
  //   }
  // }

  scrollToBottomSmooth(): void {
    const messageElementsArray = this.messageElements.toArray();
    if (messageElementsArray.length > 0) {
      const lastMessageElement = messageElementsArray[messageElementsArray.length - 1].nativeElement;
      lastMessageElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }
  userName!: string | null;
  /*messages: { content: string, from: string, timestamp: Date }[] = [    { content: 'Hi, how are you?', from: 'me', timestamp: new Date() },    { content: 'I\'m good, thanks. How about you?', from: 'Alice', timestamp: new Date() },    { content: 'I\'m doing well, thanks for asking.', from: 'me', timestamp: new Date() },  ];
*/}
