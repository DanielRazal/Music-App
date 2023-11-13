import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;


  constructor(private formBuilder: FormBuilder, private userService: UserService
    , private router: Router) { }


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userName: [''],
      password: [''],
    });
  }


  onSubmit() {
    this.userService.register(this.registerForm.value).subscribe((res) => {
      // this.router.navigate(['login']);
      this.registerForm.reset();
    }, (error) => {  });
  }
}
