import { Component, OnInit } from '@angular/core';
import { DashboardCoursesService } from '../../dashboard-courses/dashboard-courses.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-quizzes-list',
  templateUrl: './quizzes-list.component.html',
  styleUrls: ['./quizzes-list.component.css']
})

export class QuizzesListComponent implements OnInit {

  selectedContent!: any;
  loading: boolean = true;

  constructor(private _dashboardCoursesService: DashboardCoursesService, private route: ActivatedRoute
    , private _router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.getCourseDetails(id);
    });
  }

  getCourseDetails(id: any) {
    this._dashboardCoursesService.getCourseBaseOnID(id).subscribe({
      next:content => this.onSuccess(content)
    })
  }

  onSuccess(content: any) {
    this.selectedContent = content;
    this.loading = false;
  }

  openQuiz(id : any) {
    
    this._router.navigate(["quiz-attempt"], {queryParams: {quizId: id}});
  }

  
}
