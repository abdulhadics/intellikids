import { Component, OnInit , Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service'; 

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class SidebarComponent implements OnInit {
  user: any;
  constructor(private _authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this._authService.me().subscribe({
      next:response => this.handleSuccess(response),
    });
  }

  handleSuccess(response: any) {
    this.user = response;
    let data = this._authService.user;
    data.user = response;
    this._authService.setUser(data);
  }

  signOut() {
    this._authService.signOut();
  }
  updateImage(user : any){ 
   (<HTMLImageElement>document.getElementById('image_avatar')).src = user.avatar.url
  }
  updateName(user : any) {  
    console.log(user);
    (<HTMLAnchorElement>document.getElementById('name')).innerHTML = user.first_name.concat(" " + user.last_name)
  }

}
