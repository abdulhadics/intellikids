import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { NotificationService } from 'src/app/auth/notification.service';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { AccountSettingsService } from '../account-settings.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  constructor(private fb: UntypedFormBuilder, private _accountSettingsSerrvice: AccountSettingsService, private _authService: AuthService,
    private _sideBarComponent: SidebarComponent, private _notificationService: NotificationService) { }
  form!: UntypedFormGroup
  user: any;
  ngOnInit(): void {
    this.form = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z .,-]*$')]],
        lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z .,-]*$')]],
      }
    );
    this._authService.me().subscribe({
      next:user => this.handleSuccess(user)
    });
  }

  handleSuccess(user: any) {
    this.user = user;
    let data = this._authService.user;
    data.user = user;
    this._authService.setUser(data);
    this.form.setValue({ firstName: user.first_name, lastName: user.last_name })
  }

  submit() {
    if (this.form.valid) {
      const { firstName, lastName } = this.form.value;
      this._accountSettingsSerrvice.updateName(firstName.trim(), lastName.trim(), this.user.id).subscribe({
        next:response => this.nameSuccess(response),
        error: error => this.nameError(error)
      }
      );
    }
  }

  nameSuccess(response: any) {
    this._authService.refreshInfo();
    this._sideBarComponent.updateName(response);
    this._notificationService.showSuccess("Name Changed Successfully", "Success");
  }

  nameError(error: any) {
    this._notificationService.showError("Profile change failed", "Error");
  }

  uploadImage(event : any) {
    const image = event?.target?.files;
    let oldID = this.user.avatar ? this.user.avatar.id : null;
    this._accountSettingsSerrvice.uploadImage(image.item(0), this.user.id).subscribe({
      next:data => this.imageSuccess(data, oldID),
      error:error => this.imageError(error)
    })
  }

  imageSuccess(data : any, oldID : any) {
    this._authService.refreshInfo();
    this.user.avatar = Array.isArray(data) && data.length > 0 ? (data[0]?.formats && data[0]?.formats.thumbnail ? data[0].formats.thumbnail : data[0]) : null;
    this._sideBarComponent.updateImage(this.user);
    this._notificationService.showSuccess("Profile Picture Changed Successfully", "Success");
    if(oldID){
      this._accountSettingsSerrvice.removeImage(oldID);
    }
  }

  imageError(error: any) {
    this._notificationService.showSuccess("Profile Picture Changed Failed", "Error");
  }

}
