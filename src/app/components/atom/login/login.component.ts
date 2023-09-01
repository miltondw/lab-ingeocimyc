import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup=new FormGroup({});
  hide = true;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService
  ) { 
    this.buildForm()
  }

  ngOnInit(): void {
    
  }
  private buildForm() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      this.authService.login(this.loginForm.value)
    }
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

}
