import {Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from "@angular/core";
import {MessageService} from "../../Services/message.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {UserService} from "../../Services/user.service";
import {Users} from "../../Models/users";
import {ChatMessage, ChatService} from "../../Services/chat.service";
import {AuthService} from "../../Services/auth.service";
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
      <div class="flex-grow overflow-y-auto px-4 py-2" #scrollContainer (scroll)="onScroll($event)">
        <div *ngFor="let message of currentChatHistory" [ngClass]="{'flex-row-reverse': message.from === MyName, 'flex-row': message.from !== MyName}" class="flex justify-between" #messageElement>
          <div [class]="'bg-[#3d65ff] px-4 py-2 mb-2 inline-block max-w-xs whitespace-normal break-words ' + (message.from !== MyName ? 'rounded-br-2xl rounded-tr-2xl rounded-tl-2xl' : 'rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl')">
            <div class="text-white">{{ message.content }}</div>
            <div class="text-xs text-white text-right">{{ message.timestamp | date:'hh:mm' }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./chatpage.component.css']

})
export class ChatWindowComponent implements OnInit, OnDestroy {
  @ViewChildren('messageElement') messageElements!: QueryList<ElementRef>;
  @ViewChild('scrollContainer', { static: true }) private scrollContainer!: ElementRef;
  public currentChatHistory: ChatMessage[] = [];
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
      this.pageIndex = 0;
      this.allMessagesLoaded = false;
      this.currentChatHistory = [];

      this.loadMoreMessages();
      if (this.Friend) {
        this.chatService.getChatUpdates(this.Friend)
          .pipe(takeUntil(this.onDestroy))
          .subscribe((newMessages) => {
            //this.currentChatHistory = [...this.currentChatHistory, ...newMessages];
            this.currentChatHistory.push(newMessages)
          });
      }
    });

    setTimeout(() => {
      this.scrollToBottom();
    }, 0);
  }


  onScroll(event: any) {
    const element = this.scrollContainer.nativeElement;
    //console.log(element.scrollTop, event);
    if (element.scrollTop === 0) {
      this.loadMoreMessages();
    }
  }

  loadMoreMessages() {
    if (!this.allMessagesLoaded) {
      const currentScrollPosition = this.scrollContainer.nativeElement.scrollTop;
      this.chatService.getChatHistoryDB(this.MyName, this.Friend, this.pageIndex, this.pageSize)
        .pipe(takeUntil(this.onDestroy))
        .subscribe((history) => {
          history.reverse();
          // Здесь добавляем новые сообщения в начало массива
          this.currentChatHistory = [...history, ...this.currentChatHistory];

          if (history.length < this.pageSize) {
            this.allMessagesLoaded = true;
          }
          this.pageIndex++;

          setTimeout(() => {
            // Восстанавливаем позицию прокрутки
            const messageElement = this.messageElements.toArray()[history.length];

            // Прокручиваем к этому элементу, чтобы остаться на том же месте
            messageElement.nativeElement.scrollIntoView();
          },100);
        });
    }
  }

  private onDestroy = new Subject<void>();

  ngOnDestroy(): void {
    console.log('ChatWindowComponent is being destroyed');
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
