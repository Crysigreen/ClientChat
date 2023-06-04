import {Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren} from "@angular/core";
import {MessageService} from "../../Services/message.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {UserService} from "../../Services/user.service";
import {Users} from "../../Models/users";
import {ChatService} from "../../Services/chat.service";
import {AuthService} from "../../Services/auth.service";
import {MessageHistory} from "../../Models/message-history";
import {Subject, takeUntil} from "rxjs";
import {ChatHistory} from "../../Models/chat-history";

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
        <div *ngFor="let message of currentChatHistory" [ngClass]="{'flex-row-reverse': message.from === MyName, 'flex-row': message.from !== MyName}" class="flex justify-between" #messageElement>
          <div [class]="'bg-[#3d65ff] px-4 py-2 mb-2 inline-block max-w-xs whitespace-normal break-words ' + (message.from !== MyName ? 'rounded-br-2xl rounded-tr-2xl rounded-tl-2xl' : 'rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl')">
            <div class="text-white">{{ message.content }}</div>
            <div class="text-xs text-white text-right">{{ message.timestamp | date:'hh:mm' }}</div>
          </div>
        </div>
      </div>
    </div>
  `

})
export class ChatWindowComponent implements OnInit {
  @ViewChildren('messageElement') messageElements!: QueryList<ElementRef>;
  public currentChatHistory: MessageHistory[] = [];
  MyName= this.authService.MyUsername;
  userId!: string | null;
  userName!: string | null;
  Friend!: string;
  private pageIndex: number = 0; // Сhat history page number
  private pageSize: number = 20; // Number of uploaded messages
  private allMessagesLoaded: boolean = false; // Flag indicating whether all messages are loaded

  constructor(private messageService: MessageService, private route: ActivatedRoute, private userService: UserService,private chatService: ChatService, private authService: AuthService) {}
  ngOnInit() {
    // this.chatService.startConnection(this.authService.username);
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.route.queryParamMap.subscribe((queryParams: ParamMap) => {
      this.userName = queryParams.get('username');
    });
    this.route.queryParams.subscribe(params => {
      this.Friend = params['username'];

      this.loadMoreMessages();
      if (this.Friend) {
        // this.chatService.getChatHistory(this.Friend)
        //   .pipe(takeUntil(this.onDestroy))
        //   .subscribe((history) => {
        //     this.currentChatHistory = history;
        //
        //     // After the chat history is loaded, subscribe to new messages
        //     this.chatService.getChatUpdates(this.Friend)
        //       .pipe(takeUntil(this.onDestroy))
        //       .subscribe((newMessages) => {
        //         this.currentChatHistory = newMessages;
        //       });
        //   });
        this.chatService.getChatUpdates(this.Friend)
          .pipe(takeUntil(this.onDestroy))
          .subscribe((newMessages) => {
            this.currentChatHistory = newMessages;
          });
      }
    });

    setTimeout(() => {
      this.scrollToBottom();
    }, 0);
  }
  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    // проверяем, достигли ли мы верха
    if (pos == max ) {
      // Если достигли, загружаем больше сообщений
      this.loadMoreMessages();
    }
  }

  loadMoreMessages() {
    if (!this.allMessagesLoaded) {
      this.chatService.getChatHistoryDB(this.MyName, this.Friend, this.pageIndex, this.pageSize)
        .pipe(takeUntil(this.onDestroy))
        .subscribe((history) => {
          // Здесь добавляем новые сообщения в начало массива
          this.currentChatHistory = [...history, ...this.currentChatHistory];
        });
      this.pageIndex++;
    }
  }

  private onDestroy = new Subject<void>();

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  // public selectChat(friendUsername: string): void {
  //   this.chatService.getChatHistory(friendUsername)
  //     .pipe(takeUntil(this.onDestroy))
  //     .subscribe((history) => {
  //       this.currentChatHistory = history;
  //     });
  // }

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
  /*messages: { content: string, from: string, timestamp: Date }[] = [    { content: 'Hi, how are you?', from: 'me', timestamp: new Date() },    { content: 'I\'m good, thanks. How about you?', from: 'Alice', timestamp: new Date() },    { content: 'I\'m doing well, thanks for asking.', from: 'me', timestamp: new Date() },  ];
*/}
