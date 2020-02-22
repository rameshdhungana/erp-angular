import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../../../../shared/services/alert.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AttendeeEventRegistrationService} from '../../../../../core/services/attendee/attendee-event-registration.service';
import {AttendeePersonnelDetail} from '../../../../../core/models/attendee/attendee-personnel-detail.model';
import * as countryCodeList from '../../../../../../assets/json/country_code.json';
import {FormSubmitValidationService} from '../../../../../shared/services/form-submit-validation.service';
import {EventService} from '../../../../../core/services/dashboard/event.service';
import {OpenExternalUrlInNewTab} from '../../../../../shared/utils/open-external-url-in-new-tab';
import {EventCommonService} from '../../../../../core/services/common/event-common.service';

@Component({
  selector: 'app-register-personnel-detail',
  templateUrl: './register-personnel-detail.component.html',
  styleUrls: ['./register-personnel-detail.component.css']
})
export class RegisterPersonnelDetailComponent implements OnInit {
  public countryJsonList: any;
  eventUuid: string;
  eventDetail: any;
  showLinkToViewEventRegistrationDetail = false;
  viewEventRegistrationDetailLink: any;
  errorMessages: Array<any>;
  formIsSubmitted = false;


  constructor(private formBuilder: FormBuilder,
              private alertService: AlertService,
              private registrationService: AttendeeEventRegistrationService,
              private router: Router,
              private formSubmitValidationService: FormSubmitValidationService,
              private activatedRoute: ActivatedRoute,
              private eventService: EventService,
              private eventCommonService: EventCommonService) {

  }

  personnelDetailForm: FormGroup;
  attendeePersonnelDetail = new AttendeePersonnelDetail();


  ngOnInit() {

    this.eventUuid = this.activatedRoute.snapshot.paramMap.get('eventUuid');
    this.buildForm();
    this.getEventDetail();
    this.countryJsonList = Array(countryCodeList['default']);
  }


  getEventDetail() {
    this.eventCommonService.getEventDetail(this.eventUuid).subscribe(response => {
      this.eventDetail = response['data'];
    });
  }


  buildForm() {
    this.personnelDetailForm = this.formBuilder.group({
        'first_name': [this.attendeePersonnelDetail.first_name, Validators.required],
        'last_name': [this.attendeePersonnelDetail.last_name, Validators.required],
        'email': [this.attendeePersonnelDetail.email, [
          Validators.pattern(
            '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'), Validators.email]],
        // 'gender': [this.attendeePersonnelDetail.gender, Validators.required],
        'phone_number': [this.attendeePersonnelDetail.phone_number, Validators.required],
        'country': [this.attendeePersonnelDetail.country, Validators.required],
        'is_pwk': [this.attendeePersonnelDetail.is_pwk, Validators.required],
        'is_senior_citizen': [this.attendeePersonnelDetail.is_senior_citizen, Validators.required],
        'city': [this.attendeePersonnelDetail.city, Validators.required],
        'name_in_smart_card': [this.attendeePersonnelDetail.name_in_smart_card],
        'smart_card_number': [this.attendeePersonnelDetail.smart_card_number, [
          Validators.minLength(6), Validators.maxLength(6)]],


      }
    );

  }


  createMainAttendee() {
    if (this.personnelDetailForm.valid) {
      this.formIsSubmitted = true;
      const formData = this.personnelDetailForm.value;

      this.registrationService.createMainAttendee(this.eventUuid, formData).subscribe(response => {
        if (response['code'] === 0) {
          this.formIsSubmitted = false;

          const errorList = [];
          for (const data of response['data']) {
            errorList.push(data['message']);
            this.errorMessages = errorList;
            if (data['status'] === 'ALREADY' && data['link']) {
              this.showLinkToViewEventRegistrationDetail = true;
              this.viewEventRegistrationDetailLink = data['link'];
            }
          }
        } else {

          this.alertService.success('Personnel detail are registered successfully');
          const mainAttendeeUuid = response['data']['main_attendee_uuid'];
          this.router.navigateByUrl(`/events/registration/accommodation-type/${this.eventUuid}/${mainAttendeeUuid}`);

        }
      }, error1 => {
        this.formIsSubmitted = false;
      });
    } else {
      this.formSubmitValidationService.unMarkAllFormControls(this.personnelDetailForm);
      this.formSubmitValidationService.consoleLogErrors(this.personnelDetailForm);
    }
  }


  get parentForm() {
    return this.personnelDetailForm.controls;
  }


  openUrlInNewTab(url) {
    OpenExternalUrlInNewTab.openUrlInNewTab(url);
  }


}
