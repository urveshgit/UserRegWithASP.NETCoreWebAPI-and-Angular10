import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http:HttpClient) { }
  readonly BaseURI = 'http://localhost:55608/api';

  formModel = this.fb.group({
    FirstName: ['',Validators.required],
    LastName: [''],
    UserName: ['',Validators.required],
    Email: ['',Validators.email],
    Passwords: this.fb.group({
      Password: ['', [Validators.required,Validators.minLength(6)]],
      ConfirmPassword: ['',Validators.required]
    }, {validators: this.comparePasswords })

   
  });

  comparePasswords(fb: FormGroup)
  {
    let confirmPswCtrl = fb.get('ConfirmPassword');    
      if(confirmPswCtrl.errors == null || 'psswordMismatch' in confirmPswCtrl.errors)
      {
          if(fb.get('Password').value != confirmPswCtrl.value)
          {
            confirmPswCtrl.setErrors({psswordMismatch: true});
          }
          else
          {
            confirmPswCtrl.setErrors(null);
          }
      }
  }

  register(){
    var body = {
      FirstName: this.formModel.value.FirstName,
      LastName: this.formModel.value.FirstName,
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI+'/ApplicationUserAPI/UserRegister',body);
  }
}
