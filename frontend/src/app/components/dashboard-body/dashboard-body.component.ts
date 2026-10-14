import { Component, OnInit } from '@angular/core';
import { DashboardBodyService } from './dashboard-body.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-body.component.html',
  styleUrls: ['./dashboard-body.component.css']
})
export class DashboardBodyComponent implements OnInit {
  data!: any;
  user!: any;
  loading: boolean = true;
  constructor(private _dashboardService: DashboardBodyService, private _authService: AuthService) { }

  ngOnInit(): void {
    this._authService.me().subscribe({
      next:user => this.handleSuccess(user)
    });
    
  }

  onSuccess(data: any) {
    this.data.quizzesLength = 0;
    data.map((d : any) => {this.data.quizzesLength += d.quizzes.length});
    this.loading = false;
  }

  handleSuccess(user: any) {
    this.user = user;
    let data1 = this._authService.user;
    data1.user = user;
    this._authService.setUser(data1);
    this.data = this.user;
    this._dashboardService.getQuizzesLength(this.user.grade).subscribe({
      next:data2=> this.onSuccess(data2),
    })
  }

}
