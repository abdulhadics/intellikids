import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

// Configure credentials via environment or backend proxy



@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  constructor(private http : HttpClient, private _authService: AuthService) { }

  getQuestionJson(){
    return this.http.get<any>("assets/questions.json");
  }

  getLatestUserInfo() {
    return this._authService.me();
  }

  getCoursesForSpecificGrades(grade: any) {
    return this.http.get(`contents?populate=*&filters[grade][$eq]=${grade}`);
  }

  getCourseBaseOnID(id: any) {
    return this.http.get(`contents/${id}?populate=*`);
  }

  getQuizDetailBasedOnID(id : any) {
    return this.http.get(`quizzes/${id}?populate=*`)
  }

  createAttemptQuiz(userId: any, quizId: any, isPassed: any) {
    let data = {
      "data": {
        "user": userId,
        "quiz": quizId,
        "is_passed": isPassed
      }
    }

    return this.http.post<any>(`quiz-attempts`, data);
  }

  sendRequestToGPTModel(Question: any, Answer: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_OPENAI_API_KEY`
    });

    const content = {
      "model": "ft:gpt-3.5-turbo-0613:personal::8RIrnxqD",
      "messages": [
          {
              "role": "system",
              "content": "You are talking to a chatbot. Ask me any question."
          },
          {
              "role": "user",
              "content": `Question:${Question}\nAnswer:${Answer}`
          }
      ],
      "max_tokens": 256
  }
    return this.http.post('https://api.openai.com/v1/chat/completions', content, {headers});
  }

  sendSpeechDataToGPT(audio: Blob) {
    const formData = new FormData();
    formData.append('file', audio);
    formData.append('model', 'whisper-1');
    const headers = new HttpHeaders({
      'Authorization': `Bearer YOUR_OPENAI_API_KEY`
    });
    return this.http.post('https://api.openai.com/v1/audio/transcriptions', formData, {headers});
  }

  
}
