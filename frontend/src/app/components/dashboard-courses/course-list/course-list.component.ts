import { Component, OnInit } from '@angular/core';
import { DashboardCoursesService } from '../dashboard-courses.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  selectedContent!: any;
  loading: boolean = true;

  constructor(private _dashboardCoursesService: DashboardCoursesService, private route: ActivatedRoute) {}

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


  activeVideoUrl!: any;
  clicked: boolean = false;
  openVideo(videoUrl: string) {
    if (!this.clicked) {
    this.activeVideoUrl = videoUrl;
    this.clicked = true;
    }
    else {
      if(this.activeVideoUrl != videoUrl) {
        this.activeVideoUrl = videoUrl;
      } else {
      this.activeVideoUrl = null;
      }
      this.clicked = false;
    }
  }

}
