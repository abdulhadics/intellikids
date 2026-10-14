import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { EmailsComponent } from './emails/emails.component';
import { AccountSettingsComponent } from './account-settings.component';
@NgModule({
  declarations: [
    ChangePasswordComponent,
    ProfileInfoComponent,
    EmailsComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  exports: [
    ChangePasswordComponent,
    AccountSettingsComponent,
    EmailsComponent,
    ProfileInfoComponent
  ]
})


export class AccountSettingsModule { }
