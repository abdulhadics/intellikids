import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ErrorService } from 'src/app/auth/error.service'; 

@Injectable({
  providedIn: 'root'
})
export class AccountSettingsService {

  constructor(private http: HttpClient,private _errorService: ErrorService,
    private _authService: AuthService) {

  }

  uploadImage(file: any, id: any) {
    const formData = new FormData();
    formData.append("files", file);
    formData.append("refId", id);
    formData.append("ref", "plugin::users-permissions.user");
    formData.append("source", "plugin::users-permissions");
    formData.append("field", "avatar");
    return this.http.post<any>('upload/', formData);
  }

  removeImage(id: any) {
    let url = `upload/files/${id}`;
    this.http.delete(url).subscribe({
      next:res => console.log(res)
    });
  }

  updateName(firstName : any, lastName : any, id: any){
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    return this.http.put<any>(`users/${id}`,formData)
  }

  changePassword(oldPassword: any,newPassword: any,confirmNewPassword: any)
  {
    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("password", newPassword);
    formData.append("confirmPassword",confirmNewPassword);
    return this.http.post<any>(`users/change-password`,formData);
  }

  handleError(error: any) {
    return this._authService.handleError(error);
  }

}
