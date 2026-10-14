import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardBodyService {

  constructor(private http: HttpClient) { }

  /*GET Dashboard Data*/
  getDashboardData() {
    return this.http.get("me?populate=*");
  }

  getQuizzesLength(grade: any) {
    return this.http.get(`contents?populate=*&filters[grade][$eq]=${grade}`);
  }

}
