import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardCoursesService {

  constructor(private http : HttpClient, private _authService: AuthService) { }

  getLatestUserInfo() {
    return this._authService.me();
  }

  getCoursesForSpecificGrades(grade: any) {
    return this.http.get(`contents?populate=*&filters[grade][$eq]=${grade}`);
  }

  getCourseBaseOnID(id: any) {
    return this.http.get(`contents/${id}?populate=*`);
  }

  isDistracted(image: any) {
    return this.http.post("http://localhost:5000/process_image", image);
  }

}
