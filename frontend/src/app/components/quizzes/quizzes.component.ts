import { Component, OnInit } from '@angular/core';
import { QuizzesService } from './quizzes.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {
  constructor(private _quizzesService : QuizzesService) {}

  user!: any;
  loading: boolean = true;
  userCourses!: any;

  ngOnInit(): void {
    this._quizzesService.getLatestUserInfo().subscribe({
      next:user => this.handleSuccess(user)
    });
  }

  handleSuccess(user: any) {
    this.user = user;
    this._quizzesService.getCoursesForSpecificGrades(user.grade).subscribe({
      next:data=> this.handleSuccessForCourses(data)
    });
  }

  handleSuccessForCourses(data: any) {
    this.loading = false;
    this.userCourses = data;
  }

}
