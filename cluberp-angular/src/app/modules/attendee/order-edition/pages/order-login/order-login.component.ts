import {Component, OnInit} from '@angular/core';
import {AttendeeEventRegistrationService} from '../../../../../core/services/attendee/attendee-event-registration.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormSubmitValidationService} from '../../../../../shared/services/form-submit-validation.service';
import {AlertService} from '../../../../../shared/services/alert.service';
import {HttpClient} from '@angular/common/http';
import {EventCommonService} from '../../../../../core/services/common/event-common.service';
import {AttendeeOrderEditService} from '../../../../../core/services/attendee/attendee-order-edit.service';
import {OrderLoginConfirmationCodeService} from '../../../../../shared/services/order-login-confirmation-code.service';

@Component({
  selector: 'app-order-login',
  templateUrl: './order-login.component.html',
  styleUrls: ['./order-login.component.css']
})
export class OrderLoginComponent implements OnInit {
  eventUuid: string;
  orderLoginForm: FormGroup;
  formIsSubmitted: boolean;

  constructor(
    private attendeeEventService: AttendeeEventRegistrationService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private formSubmitValidationService: FormSubmitValidationService,
    private  router: Router,
    private registrationService: AttendeeEventRegistrationService,
    private alertService: AlertService,
    private eventCommonService: EventCommonService,
    private  orderEditService: AttendeeOrderEditService,
    private orderLoginConfirmationCodeService: OrderLoginConfirmationCodeService
  ) {
  }

  ngOnInit() {
    this.eventUuid = this.activatedRoute.snapshot.paramMap.get('eventUuid');
    this.buildForm();
  }

  orderLogin() {
    if (this.orderLoginForm.valid) {
      this.formIsSubmitted = true;
      this.orderEditService.orderLogin(this.eventUuid, this.orderLoginForm.value).subscribe(response => {
        if (response['code'] === 1) {
          const attendeeUuid = response['data']['attendee_uuid'];
          // here we set the token for the user , since token is also obtained as response
          localStorage.setItem('token', response['data']['key']);
          this.orderLoginConfirmationCodeService.setOrderLoginConfirmationCode(response['data']['confirmation_code']);
          this.router.navigateByUrl(`/events/order/summary/${this.eventUuid}/${attendeeUuid}`);
        } else {
          this.alertService.error(response['message']);
        }
      }, error1 => {
        this.formIsSubmitted = false;

      });
    } else {
      this.formSubmitValidationService.unMarkAllFormControls(this.orderLoginForm);
    }

  }

  buildForm() {
    this.orderLoginForm = this.formBuilder.group(
      {
        'option': ['phone_number', Validators.required],
        'phone_number': [''],
        'email': ['', Validators.email],
        'confirmation_code': ['', Validators.required]
      });
  }

  get form() {
    return this.orderLoginForm.controls;
  }

  ngAfterContentChecked() {
    this.form['option'].valueChanges.subscribe(data => {
      if (this.form['option'].value === 'phone_number') {
        this.form['phone_number'].setValidators([Validators.required]);
        this.form['email'].clearValidators();
        this.orderLoginForm.patchValue({'email': null});

      } else {
        this.form['email'].setValidators([Validators.required]);
        this.orderLoginForm.patchValue({'phone_number': null});

        this.form['phone_number'].clearValidators();


      }
      this.form['phone_number'].updateValueAndValidity();
      this.form['email'].updateValueAndValidity();

    });


  }

}




