import { Component, OnInit } from '@angular/core';
import { DashboardCoursesService } from './dashboard-courses.service';
@Component({
  selector: 'app-dashboard-courses',
  templateUrl: './dashboard-courses.component.html',
  styleUrls: ['./dashboard-courses.component.css']
})
export class DashboardCoursesComponent implements OnInit {

  constructor(private _dashbordCoursesService : DashboardCoursesService) {}

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
      next:data=> this.handleSuccessForCourses(data)
    });
  }

  handleSuccessForCourses(data: any) {
    this.loading = false;
    this.userCourses = data;
  }

}
