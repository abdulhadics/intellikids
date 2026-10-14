import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup,  Validators} from '@angular/forms'; 
import { NotificationService } from 'src/app/auth/notification.service';
import { AccountSettingsService } from '../account-settings.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private fb:UntypedFormBuilder, private _accountSettingsService : AccountSettingsService,private _notficationService: NotificationService) { }
  form!:UntypedFormGroup;
  ngOnInit(): void {
    this.form = this.fb.group(
      {
      oldPassword: ['',[Validators.required,Validators.minLength(8)]],
      newPassword: ['', [Validators.required,Validators.minLength(8)]],
      confirmNewPassword: ['', [Validators.required,Validators.minLength(8)]] 
    });
  }

  get passwordMatch()
  {
    const {newPassword,confirmNewPassword} = this.form.value;
   
    if(newPassword === confirmNewPassword)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  submit()
  {
    if(this.form.valid)
    {
      if(this.passwordMatch)
      {
        const{oldPassword,newPassword,confirmNewPassword} = this.form.value;
        this._accountSettingsService.changePassword(oldPassword,newPassword,confirmNewPassword).subscribe({
          next:response => this.handleSuccess(response),
          error:error => this.handleError(error)
        }
        );
      }
      else
      {
        this._notficationService.showWarning("New Passwords Don't Match","Warning");
      }
    }
  }

  handleSuccess(response: any) {
    this._notficationService.showSuccess("Password Changed Successfully","Success");
    this.ngOnInit();
  }

  handleError(error: any) {
    let error1 = this._accountSettingsService.handleError(error);
    error1 = error1.includes("Email or password is incorrect.") ? "Old Password Is Incorrect." : error1;
    this._notficationService.showError(error1,"Error");
  }
  
}
