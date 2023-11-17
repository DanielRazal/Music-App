import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService
    , private router: Router, private cookieService: CookieService
    , private alertService: AlertService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: [''],
      password: ['']
    });
  }


  onSubmit() {
    this.userService.login(this.loginForm.value)
      .subscribe((res) => {

        this.cookieService.set('token', res.token)
        this.cookieService.set('userId', JSON.stringify(res.userLogin._id))

        this.router.navigate(['search']);
        this.loginForm.reset();
        this.alertService.success('Success', res.message, `Status code: ${res.statusCode}`);
        console.log(res);
      }, (error) => {
        this.alertService.error('Fails', error.error.message, `Status code: ${error.status}`);
      });
  }
}