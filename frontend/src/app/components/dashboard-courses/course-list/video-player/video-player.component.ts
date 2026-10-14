import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Input } from '@angular/core';
import { DashboardCoursesService } from '../../dashboard-courses.service';
import { NotificationService } from 'src/app/auth/notification.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('media', { static: true }) media!: ElementRef;
  @Input() videoSource: any;
  loading: boolean = true;

  capturingImages: boolean = false;
  mediaStream: MediaStream | undefined;
  cameraVideo: HTMLVideoElement | undefined;

  constructor(private _dashboardBodyService: DashboardCoursesService, 
    private _notificationService : NotificationService) { }

  ngOnInit(): void {
    // Register video play/pause event listeners
    this.media.nativeElement.addEventListener('play', () => this.startCamera());
    this.media.nativeElement.addEventListener('pause', () => this.stopCamera());
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }

  startCamera() {
    if (!this.mediaStream) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          this.mediaStream = stream;
          this.cameraVideo = document.createElement('video');
          this.cameraVideo.srcObject = stream;
          this.cameraVideo.play();

          this.cameraVideo.addEventListener('loadedmetadata', () => {
            this.startCapture();
            this.loading = false;
          });
        })
        .catch((error) => {
          console.error('Error accessing camera:', error);
        });
    }
  }

  stopCamera() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => {
        track.stop();
      });
      this.mediaStream = undefined;
      this.stopCapture();
      if (this.cameraVideo) {
        this.cameraVideo.srcObject = null;
      }
    }
  }

  capturedImages: Array<string> = [];
  captureInterval!: any;
  isCapturing: boolean = false;
  distractedCounts: number = 0;

  startCapture() {
    this.capturingImages = true;
    this.capturedImages = [];

    this.captureInterval = setInterval(() => {
      if (this.capturingImages && this.cameraVideo) {
        const canvas = document.createElement('canvas');
        canvas.width = this.cameraVideo.videoWidth;
        canvas.height = this.cameraVideo.videoHeight;
        const context = canvas.getContext('2d');
        context?.drawImage(this.cameraVideo, 0, 0, canvas.width, canvas.height);
        const capturedImageUrl = canvas.toDataURL('image/jpeg');
        this.capturedImages.push(capturedImageUrl);
        this.sendImageToFlask(capturedImageUrl);
      }
    }, 1000);
  }

  stopCapture() {
    this.capturingImages = false;
    clearInterval(this.captureInterval);
  }

  isVideoPlaying() {
    return !this.media.nativeElement.paused && !this.media.nativeElement.ended;
  }

  sendImageToFlask(capturedImage: string) {
    const formData = new FormData();
    const blob = this.dataURItoBlob(capturedImage);
    formData.append('image', blob);
    this._dashboardBodyService.isDistracted(formData).subscribe({
      next:response=> this.onSuccess(response),
    });
  }

  onSuccess(response : any) {
    if (response.result === "focused") {
      return;
    } else {
      this.distractedCounts++;
      if (this.distractedCounts == 10) {
        this.media.nativeElement.pause();
        this.stopCapture();
        this.stopCamera();
        this._notificationService.showWarning("You have been distracted for 10 sec.", "Video Paused");
        this.distractedCounts = 0;
      }
    }
  }

  dataURItoBlob(dataURI: any) {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
  }
}
