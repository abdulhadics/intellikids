import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeLast } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _authService: AuthService, private router : Router) {

  }
  isloggedIn : boolean = false;
  message : string = '';
  ngOnInit(): void {
    if (this._authService.user) {
      this.isloggedIn=true;
      this.message = "Signout";
    } else {
      this.message = "Login";
    }
  }

  buttonHandler() {
    if (this._authService.user) {
      this._authService.signOut();
      this.updateMessage("Login", "Join Now");
    } else {
      this.router.navigate(["login"]);
    }
  }

  updateMessage(message : any, secondMsg: any){ 
    (<HTMLImageElement>document.getElementById('message')).innerHTML = message;
    (<HTMLImageElement>document.getElementById('join-btn')).innerHTML = secondMsg;
   }

   buttonHandler1() {
    if (this.isloggedIn) {
      this.router.navigate(['dashboard']);
    }
    else {
      this.router.navigate(["sign-up"]);
    }

   }

}
