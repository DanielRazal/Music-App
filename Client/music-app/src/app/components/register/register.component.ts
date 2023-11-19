import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;


  constructor(private formBuilder: FormBuilder, private userService: UserService
    , private router: Router, private alertService: AlertService
    , private errorService: ErrorService) { }


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userName: [''],
      password: [''],
    });
  }

  onSubmit() {
    this.userService.register(this.registerForm.value).subscribe((res) => {
      this.router.navigate(['login']);
      this.registerForm.reset();
      this.alertService.success('Success', res.message, `Status code: ${res.statusCode}`);
    }, (error) => {
      this.errorService.errorsRegister(error);
    }
    )
  }
}