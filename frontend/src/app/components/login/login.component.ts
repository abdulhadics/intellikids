import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from "@angular/router"
import { ErrorService } from '../../auth/error.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signedUpMessage!: string;
  isloggedIn:boolean=false;
  constructor(private fb: FormBuilder, private _authService: AuthService, private router: Router, private _errorService: ErrorService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation) {
      const state = navigation.extras.state as { data: string };
      this.signedUpMessage = state ? state.data : '';
    }
    if (this._authService.user) {
      this.isloggedIn=true;
      this.router.navigate(["dashboard"])
    }
    this.isloggedIn=false;
  }

  error!: string;
  form!: FormGroup
  ngOnInit(): void {
    this.form = this.fb.group({
      identifier: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

  }
  submit() {
    const { identifier, password } = this.form.value;
    if (this.form.valid) {
      this._authService.signIn(identifier, password).subscribe({
        next:response=> this.successfullLogin(response),
        error:error=> this.handleLoginError(error)
      });
    }
  }

  updateMessage(message : any, secondMsg: any){ 
    (<HTMLImageElement>document.getElementById('message')).innerHTML = message;
    (<HTMLImageElement>document.getElementById('join-btn')).innerHTML = secondMsg;
   }

   successfullLogin(response : any) {
    this._authService.setUser(response);       
    this.isloggedIn=true;
    this.router.navigate(["dashboard"]);
    this.updateMessage("Signout", "Dashboard");
   }

   handleLoginError(error: any) {
      this.isloggedIn = false;
      this.error = this._authService.handleError(error);
   }

}
