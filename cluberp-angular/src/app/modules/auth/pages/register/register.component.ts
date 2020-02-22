import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserRegistration} from 'src/app/core/models/auth/user-registration.model';
import {AlertService} from '../../../../shared/services/alert.service';
import {ConfirmPasswordValidator} from '../../../../shared';
import {AuthenticationService} from '../../../../core/services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private alertService: AlertService,
              private authService: AuthenticationService,
              private router: Router) {
  }

  registrationForm: FormGroup;
  userRegistration = new UserRegistration();


  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
        'first_name': [this.userRegistration.first_name, Validators.required],
        'last_name': [this.userRegistration.last_name, Validators.required],
        'email': [this.userRegistration.email, Validators.email],
        'password1': [this.userRegistration.password1, Validators.required],
        'password2': [this.userRegistration.password2, Validators.required],
        'gender': [this.userRegistration.gender, Validators.required],
        'phone_number': [this.userRegistration.phone_number, Validators.required],
        // 'agreed_checkbox': [true, Validators.requiredTrue]


      }, {
        validators: ConfirmPasswordValidator.MatchPassword

      }
    );
  }

  get f() {
    return this.registrationForm.controls;
  }

  registerUser() {
    if (this.registrationForm.valid) {


      const formData = this.registrationForm.value;

      const phone_number = formData['phone_number']['internationalNumber'];
      delete formData['phone_number'];
      formData['phone_number'] = phone_number;

      this.authService.registerUser(formData).subscribe(response => {
        this.alertService.success('Please Verify your Phonenumber and Email');
        this.router.navigateByUrl('verify-phone');
      });
    } else {
      this.alertService.error('Please Enter all the required form fields');
    }
  }

}

