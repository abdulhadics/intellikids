import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseProgressService {

  constructor(private _http: HttpClient) { }

  getAllQuizAttemptsForUser(userID : any) {
    return this._http.get<any[]>(`quiz-attempts?populate=*&filters[user][id][$eq]=${userID}`)
  }
  getCoursesForSpecificGrades(grade: any) {
    return this._http.get(`contents?populate=*&filters[grade][$eq]=${grade}`);
  }
}
