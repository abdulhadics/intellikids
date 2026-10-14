import { Component, OnInit } from '@angular/core';
import { DashboardCoursesService } from '../dashboard-courses/dashboard-courses.service';
import { CourseProgressService } from './course-progress.service';

interface Course{
  name: string,
  totalQuiz: number,
  completedQuiz: number,
  totalVideos: number,
  watchedVideos: number,
}

@Component({
  selector: 'app-course-progress',
  templateUrl: './course-progress.component.html',
  styleUrls: ['./course-progress.component.css']
})

export class CourseProgressComponent implements OnInit{

  constructor(private _dashbordCoursesService : DashboardCoursesService, 
    private _courseProgressService: CourseProgressService) {}

  courses: Course[] = [];
  quizAttemptDetails: any[] = [];
  isQuizPassed: any[] = [];

  
  user!: any;
  loading: boolean = true;
  userCourses!: any;

  ngOnInit(): void {
    this._dashbordCoursesService.getLatestUserInfo().subscribe({
      next:user => this.handleSuccess(user)
    });
    
  }

  handleSuccess(user: any) {
    this.user = user;
    this._dashbordCoursesService.getCoursesForSpecificGrades(user.grade).subscribe({
      next:data=> this.handleSuccessForCourses(data, user)
    });
  }

  handleSuccessForCourses(data: any, user: any) {
    this.userCourses = data;
    this.courses.push({
      name: "Grade " + user.grade + " Maths",
      totalQuiz: this.userCourses[0].quizzes.length,
      completedQuiz: 0,
      totalVideos: this.userCourses[0].video.length,
      watchedVideos: 0
    });
  
    this.courses.push({
      name: "Grade " + user.grade + " English",
      totalQuiz: this.userCourses[1].quizzes.length,
      completedQuiz: 0,
      totalVideos: this.userCourses[1].video.length,
      watchedVideos: 0
    });
  
    this._courseProgressService.getAllQuizAttemptsForUser(user.id).subscribe(res => {
      this.quizAttemptDetails = res;
      console.log("Before filter Quiz attempts: " + this.quizAttemptDetails.length);
      this.isQuizPassed = this.quizAttemptDetails.filter(elem => elem.is_passed == true);
      const uniqueQuizzes: any[] = [];
      this.isQuizPassed = this.isQuizPassed.filter(elem => {
        if (!uniqueQuizzes.includes(elem.quiz.id)) {
          uniqueQuizzes.push(elem.quiz.id);
          return true;
        }
        return false;
      });
      console.log("Unique quizzes: " + this.isQuizPassed.length);
      this.isQuizPassed = this.isQuizPassed.filter(elem => uniqueQuizzes.includes(elem.quiz.id));
      this.isQuizPassed.forEach(elem => {
        const quizTitle = elem.quiz.title.toLowerCase();
        if (quizTitle.includes("maths")) {
          this.courses[0].completedQuiz++;
        } else if (quizTitle.includes("english")) {
          this.courses[1].completedQuiz++;
        }
      });
      this.loading = false;
    });
  }
  

}
