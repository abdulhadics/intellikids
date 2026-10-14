import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizzesService } from '../../quizzes.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  constructor(private _route: ActivatedRoute, private _quizzesService: QuizzesService, 
    private _router: Router) { }

  loading: boolean = true;
  currentQuiz!: any;

  ngOnInit(): void {
    this._route.queryParamMap.subscribe(params => {
      const id = params.get('quizId');
      this.getQuizDetails(id);
    });
  }

  getQuizDetails(id: any) {
    this._quizzesService.getQuizDetailBasedOnID(id).subscribe({
      next:data=> this.onSuccess(data),
    })
  }

  onSuccess(data: any) {
    this.currentQuiz = data;
    this.loading = false;
  }

  startQuiz(id: any) {
    this._router.navigate(["quiz"], {queryParams: {quiz: id}});
  }
 
}
