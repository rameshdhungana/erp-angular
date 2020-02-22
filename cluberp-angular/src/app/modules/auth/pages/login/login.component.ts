import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {tap, delay, finalize, catchError} from 'rxjs/operators';
import {of} from 'rxjs';

import {AuthenticationService} from '../../../../core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string;
  isLoading: boolean;
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthenticationService) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.isLoading = true;

    const credentials = this.loginForm.value;

    this.authService.login(credentials)
      .subscribe(
        (response) => {
          localStorage.setItem('token', response['data']['key']);
          this.router.navigateByUrl('dashboard');

        },
        errors => {
          console.log(errors);
        }
      );

  }


}
