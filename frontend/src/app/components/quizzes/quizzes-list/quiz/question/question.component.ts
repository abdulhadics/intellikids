import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuizzesService } from '../../../quizzes.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardCoursesService } from 'src/app/components/dashboard-courses/dashboard-courses.service';
import { NotificationService } from 'src/app/auth/notification.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy {

  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  user!: any;
  counter = 30;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted: boolean = false;
  title!: any;
  loading: boolean = true;
  form!: FormGroup;
  quizId!: any;

  constructor(private questionService: QuizzesService, private _authService: AuthService,
    private _route: ActivatedRoute, private fb: FormBuilder, private _router: Router,
    private _dashboardBodyService: DashboardCoursesService,
    private _notificationService: NotificationService) { }

  ngOnInit(): void {
    this.startCamera();
    this.form = this.fb.group({
      input: ['', [Validators.required]],
    });
    this.user = this._authService.user.user
    this.name = this.user.first_name + " " + this.user.last_name;
    this._route.queryParamMap.subscribe(params => {
      const id = params.get('quiz');
      this.quizId = id;
      this.questionService.getQuizDetailBasedOnID(id).subscribe({
        next: data => this.onSuccess(data)
      });
    });
    this.startCounter();

  }

  ngOnDestroy(): void {
    this.stopCamera();
  }

  onSuccess(data: any) {
    this.questionList = data.questions;
    this.title = data.title;
    this.loading = false;
  }

  nextQuestion() {
    this.answer(this.currentQuestion + 1, this.questionList[this.currentQuestion].reference_answer);

  }

  correct: number = 0;

  async answer(currentQno: number, option: any) {
    const { input } = this.form.value;
    if (currentQno === this.questionList.length) {
      this.isQuizCompleted = true;
      this.stopCounter();
      this.stopCamera();
      this.createQuizAttempt();
      this._notificationService.showWarning(`You Were distracted for ${this.distractedCounts} sec.`, "Quiz Summary");
    }
    const result = await this.getResponseFromGPT(
      this.questionList[this.currentQuestion]?.question,
      input
    );
    if (result == 1) {
      this.points += 1;
      this.correctAnswer++;
      setTimeout(() => {
        this.form.get('input')?.patchValue('');
        this.form.get('input')?.clearValidators();
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);
    } else {
      this.inCorrectAnswer++;
      setTimeout(() => {
        this.form.get('input')?.patchValue('');
        this.form.get('input')?.clearValidators();
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);
    }
  }

  startCounter() {
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.inCorrectAnswer++;
          this.currentQuestion++;
          this.getProgressPercent();
          if (this.currentQuestion === this.questionList.length) {
            this.isQuizCompleted = true;
            this.stopCounter();
            this.stopCamera();
            this._notificationService.showWarning(`You Were distracted for ${this.distractedCounts} sec.`, "Quiz Summary");
            this.createQuizAttempt();
          }
          this.counter = 30;
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 300000);
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 30;
    this.startCounter();
  }

  resetQuiz() {
    this.resetCounter();
    this.ngOnInit();
    this.points = 0;
    this.counter = 30;
    this.currentQuestion = 0;
    this.progress = "0";

  }

  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;

  }

  goToDashboard() {
    this._router.navigate(['dashboard']);
  }

  capturingImages: boolean = false;
  mediaStream: MediaStream | undefined;
  cameraVideo: HTMLVideoElement | undefined;


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

  sendImageToFlask(capturedImage: string) {
    const formData = new FormData();
    const blob = this.dataURItoBlob(capturedImage);
    formData.append('image', blob);
    this._dashboardBodyService.isDistracted(formData).subscribe({
      next: response => this.onSuccess1(response),
    });
  }

  onSuccess1(response: any) {
    if (response.result === "focused") {
      return;
    } else {
      this.distractedCounts++;
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

  checkResult() {
    let isPassed = false;
    let percentage = (this.correctAnswer / this.questionList.length) * 100;
    if (percentage >= 60) {
      isPassed = true;
    }
    return isPassed;
  }

  createQuizAttempt() {
    this.questionService.createAttemptQuiz(this.user.id, this.quizId, this.checkResult()).subscribe({
      next: data => this.onSuccess2(data)
    })
  }

  onSuccess2(data: any) {
    console.log(data);
  }


  mediaRecorder: MediaRecorder | undefined;
  audioChunks: Blob[] = [];
  isRecording: boolean = false;

  startRecording() {
    if (!this.isRecording) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          this.mediaRecorder = new MediaRecorder(stream);
          this.audioChunks = [];
          this.mediaRecorder.start();
          this.isRecording = true;
          this.mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              this.audioChunks.push(event.data);
            }
          };
          this.mediaRecorder.onstop = () => {
            const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
            this.processAudio(audioBlob);
          };
        })
        .catch((error) => {
          console.error('Error accessing microphone:', error);
        });
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.mediaRecorder = undefined;
      this.isRecording = false;
    }
  }

  processAudio(audioBlob: Blob) {
    this.questionService.sendSpeechDataToGPT(audioBlob).subscribe({
      next: response => this.handleWhisperData(response)
    })
  }

  getResponseFromGPT(question: any, answer: any): Promise<any> {
    return new Promise((resolve) => {
      this.questionService.sendRequestToGPTModel(question, answer).subscribe({
        next: response => {
          const result = this.onGPTSuccess(response);
          resolve(result);
        },
        error: err => {
          console.warn("OpenAI API call failed, falling back to direct reference answer matching:", err);
          const ref = (this.questionList[this.currentQuestion]?.reference_answer || '').toLowerCase().trim();
          const userAns = (answer || '').toLowerCase().trim();
          if (ref && userAns && (userAns === ref || userAns.includes(ref) || ref.includes(userAns))) {
            resolve(1);
          } else {
            resolve(0);
          }
        }
      });
    });
  }

  handleWhisperData(response: any) {
    this.form.get('input')?.patchValue(response.text);
    this.answer(this.currentQuestion+1, this.questionList[this.currentQuestion]?.reference_answer);
  }

  onGPTSuccess(response: any) {
    return response.choices[0].message.content;
  }

}