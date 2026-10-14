import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from 'src/app/auth/error.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseContent } from './landing-page.component';

@Injectable({
  providedIn: 'root'
})

export class ContentPopulateService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private _errorService: ErrorService) 
    { }

    public getCourses(): Observable<CourseContent[]>{
      
      return this.http.get<CourseContent[]>('contents');
      // let a: Course[] = [];
      // let courseContent: Course[] = [];
      // this.http.get<Course[]>('contents').subscribe(res =>{
      //   courseContent = res;
      //   console.log("Serv:  " + courseContent[0].__popped)
      // });
      // return a;
      // return courseContent;
      // return courseContent;
    }
}
