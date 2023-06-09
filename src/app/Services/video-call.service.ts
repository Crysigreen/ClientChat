import {ElementRef, Injectable} from '@angular/core';
import {VideoCallComponent} from "../Components/video-call/video-call.component";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VideoCallService {
  private videoCallComponent!: VideoCallComponent;
  public callRequested = new Subject<string>();

  public myVideo!: ElementRef;
  public theirVideo!: ElementRef;

  public registerComponent(videoCallComponent: VideoCallComponent): void {
    this.videoCallComponent = videoCallComponent;
  }

  public startCall(otherPeerId: string): void {
    if (this.videoCallComponent) {
      this.videoCallComponent.startCall(otherPeerId);
    }
  }
  constructor() { }
}
