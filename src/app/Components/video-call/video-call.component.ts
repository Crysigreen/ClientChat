import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import Peer from "peerjs";
import {VideoCallService} from "../../Services/video-call.service";

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent implements OnInit, OnDestroy {
  peer!: Peer;
  @ViewChild('myVideo', { static: false }) myVideo!: ElementRef;
  @ViewChild('theirVideo', { static: false }) theirVideo!: ElementRef;

  constructor(private videoCallService: VideoCallService) { }

  ngOnInit() {
    this.videoCallService.registerComponent(this);
    const MyId= localStorage.getItem('user-id');
    this.peer = new Peer(MyId!, {
      host: '/', // замените на адрес вашего сервера
      port: 3000, // порт вашего сервера
      debug: 1,
      path: '/peerjs' // путь к вашему приложению на сервере
    });

    this.peer.on('open', (id) => {
      console.log('My peer ID is: ' + id);
    });

    this.peer.on('connection', (conn) => {
      conn.on('data', (data) => {
        console.log(data);
      });
    });

    this.peer.on('call', (call) => {
      if (confirm("Вам звонят. Принять звонок?")) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then((stream) => {
            call.answer(stream);
            call.on('stream', (remoteStream) => {
              this.theirVideo.nativeElement.srcObject = remoteStream;
              if (!call.metadata.videoAvailable) {
                this.theirVideo.nativeElement.style.backgroundColor = 'black';
                this.theirVideo.nativeElement.textContent = 'Камера недоступна';
              }
              this.theirVideo.nativeElement.play();
            });
            call.on('close', () => {
              this.currentCall = null;
            });
          })
          .catch((err) => {
            console.error(err);
            if (err.name === 'NotFoundError') {
              navigator.mediaDevices.getUserMedia({ audio: true })
                .then((stream) => {
                  call.answer(stream);
                  call.on('stream', (remoteStream) => {
                    this.theirVideo.nativeElement.style.backgroundColor = 'black';
                    this.theirVideo.nativeElement.textContent = 'Камера недоступна';
                  });
                  call.on('close', () => {
                    this.currentCall = null;
                  });
                })
                .catch((err) => {
                  console.error('Audio device not found', err);
                });
            }
          });
      }
    });

    this.peer.on('error', (err) => {
      console.error(err);
    });
  }

  // ngAfterViewInit() {
  //   this.myVideo = this.videoCallService.myVideo;
  //   this.theirVideo = this.videoCallService.theirVideo;
  //
  //   // здесь вы можете использовать this.myVideo и this.theirVideo
  // }

  // @ts-ignore
  currentCall: Peer.MediaConnection | null = null;

  public startCall(otherPeerId: string) {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        this.startVideoCall(stream, otherPeerId, true);
      })
      .catch((err) => {
        console.error(err);
        if (err.name === 'NotFoundError') {
          navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
              this.startVideoCall(stream, otherPeerId, false);
            })
            .catch((err) => {
              console.error('Audio device not found', err);
            });
        }
      });
  }

  private startVideoCall(stream: MediaStream, otherPeerId: string, videoAvailable: boolean) {
    this.myVideo.nativeElement.srcObject = stream;
    const call = this.peer.call(otherPeerId, stream, {metadata: {videoAvailable}});
    this.currentCall = call;
    call.on('stream', (remoteStream) => {
      this.theirVideo.nativeElement.srcObject = remoteStream;
      this.theirVideo.nativeElement.play();
    });
    call.on('close', () => {
      this.currentCall = null;
    });
  }

  public endCall() {
    if (this.currentCall) {
      this.currentCall.close();
      this.currentCall = null;
    }
  }

  ngOnDestroy() {
    this.peer.destroy();
  }

}
