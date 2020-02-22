import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../../../../shared/services/alert.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AttendeeEventRegistrationService} from '../../../../../core/services/attendee/attendee-event-registration.service';
import {AttendeePersonnelDetail} from '../../../../../core/models/attendee/attendee-personnel-detail.model';
import * as countryCodeList from '../../../../../../assets/json/country_code.json';
import {FormSubmitValidationService} from '../../../../../shared/services/form-submit-validation.service';
import {EventService} from '../../../../../core/services/dashboard/event.service';
import {OpenExternalUrlInNewTab} from '../../../../../shared/utils/open-external-url-in-new-tab';
import {EventCommonService} from '../../../../../core/services/common/event-common.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-choose-accommodation-type',
  templateUrl: './choose-accommodation-type.component.html',
  styleUrls: ['./choose-accommodation-type.component.css']
})
export class ChooseAccommodationTypeComponent implements OnInit {
  public countryJsonList: any;
  eventUuid: string;
  attendeeUuid: string;
  eventDetail: any;
  showLinkToViewEventRegistrationDetail = false;
  viewEventRegistrationDetailLink: any;
  errorMessages: Array<any>;
  availableAccommodationSharingList = [];
  offSiteDayPassRegistrationItems = [];
  // locallySelectedOffSiteRegistrationItems  is for local storage purpose used within addOrRemoveOffSiteDayPassItems()
  locallySelectedOffSiteRegistrationItems = [];
  allDaysRegistrationItems = [];
  formIsSubmitted = false;


  // variables used for prepopulation
  groupType = new BehaviorSubject('');
  offsiteStayType = new BehaviorSubject('');
  guestAttendees = new BehaviorSubject([]);
  numberOfGuests = new BehaviorSubject(0);
  alreadyAddedRegistrationItems = new BehaviorSubject([]);

  // loading param
  loading = true;

  // to indicate the registration is changed to onsite from offsite
  registrationChangedToOnSite = new BehaviorSubject(false);

  constructor(private formBuilder: FormBuilder,
              private alertService: AlertService,
              private registrationService: AttendeeEventRegistrationService,
              private router: Router,
              private formSubmitValidationService: FormSubmitValidationService,
              private activatedRoute: ActivatedRoute,
              private eventService: EventService,
              private eventCommonService: EventCommonService,
  ) {

  }

  personnelDetailForm: FormGroup;
  attendeePersonnelDetail = new AttendeePersonnelDetail();


  ngOnInit() {


    this.eventUuid = this.activatedRoute.snapshot.paramMap.get('eventUuid');
    this.attendeeUuid = this.activatedRoute.snapshot.paramMap.get('attendeeUuid');
    this.buildForm();
    this.countryJsonList = Array(countryCodeList['default']);
    this.getAvailableAccommodationSharingList();
    this.getAlreadyRegisteredGuestAttendees();
  }

  ngAfterContentChecked() {
    this.parentForm['numberOfGuests'].valueChanges.subscribe(data => {
      // Do something
      this.generateFormArrayForGuest();

    });
    this.parentForm['offsite_stay_type'].valueChanges.subscribe(data => {
      if (data === 'all_days') {
        this.updateSelectedRegistrationItems([]);
        this.updateSelectedRegistrationItems(this.allDaysRegistrationItems);
      } else if (data === 'day_pass') {
        this.updateSelectedRegistrationItems([]);

      } else {
      }
    });


  }


  addOrRemoveOffSiteDayPassItems(checked, eventItem, itemFormIndex) {
    const itemFormGroup = this.dayPassItemForm.controls[itemFormIndex] as FormGroup;

    if (checked) {

      // first check if the selected_registration_items already contains the checked item , if yes
      //   then we do nothing but if no then we update the list
      const alreadyAdded = this.personnelDetailForm.get('selected_registration_items').value.find(item =>
        item.uuid === eventItem.uuid);
      if (!alreadyAdded) {
        this.locallySelectedOffSiteRegistrationItems.push(eventItem);
      }

    } else {
      // if unchecked then we first check if added already , if yes then remove that as it is unselected
      const index = this.personnelDetailForm.get('selected_registration_items').value.findIndex(item =>
        item.uuid === eventItem.uuid);
      if (index !== -1) {
        this.locallySelectedOffSiteRegistrationItems.splice(index, 1);

      }
    }
    this.personnelDetailForm.patchValue({'selected_registration_items': this.locallySelectedOffSiteRegistrationItems});

  }

  getAvailableAccommodationSharingList() {
    this.eventService.getAvailableAccommodationSharingList(this.eventUuid).subscribe(response => {

      this.availableAccommodationSharingList = response['data'];
    });
  }

  getEventDetail() {
    this.eventCommonService.getEventDetail(this.eventUuid).subscribe(response => {
      this.eventDetail = response['data'];

    });
  }


  async getAlreadyRegisteredGuestAttendees() {
    await this.eventCommonService.getEventDetail(this.eventUuid).toPromise().then(response => {
      this.eventDetail = response['data'];

    });
    if (this.eventDetail.only_offsite_registration) {
      this.personnelDetailForm.patchValue({'group_type': 'OffSite'});
    }
    await this.eventService.getOffSiteDayPassRegistrationItems(this.eventUuid).toPromise().then(response => {
      this.offSiteDayPassRegistrationItems = response['data'];
      this.generateDayPassItemFormArray();
    });

    await this.eventService.getAllDaysRegistrationItems(this.eventUuid).toPromise().then(response => {
      this.allDaysRegistrationItems = response['data'];

    });

    await this.registrationService.getAlreadyRegisteredGuestAttendees(this.eventUuid, this.attendeeUuid).toPromise().then(response => {
      this.registrationChangedToOnSite.next(response['data']['changed_to_onsite']);
      this.groupType.next(response['data']['group_type']);
      this.alreadyAddedRegistrationItems.next(response['data']['registration_cart_items']);


      if (this.groupType.value === 'OffSite') {
        this.offsiteStayType.next(response['data']['offsite_stay_type']);

      } else if (this.groupType.value === 'OnSite') {
        this.numberOfGuests.next(response['data']['number_of_guest_attendees']);
        this.guestAttendees.next(response['data']['guest_attendees']);

      } else {
        this.groupType.next('OnSite');
        this.numberOfGuests.next(0);
        this.guestAttendees.next([]);
        this.alreadyAddedRegistrationItems.next(this.allDaysRegistrationItems);

      }


    });
    this.patchValueToAdditionalGuestForm();


  }

  buildForm() {
    this.personnelDetailForm = this.formBuilder.group({
        'additionalGuests': this.formBuilder.array([]),
        'numberOfGuests': [0],
        'group_type': ['', Validators.required],
        'offsite_stay_type': [''],
        'selected_registration_items': [[], Validators.required],
        'selected_offsite_day_pass_items': this.formBuilder.array([]),


      }
    );


  }


  generateDayPassItemFormArray() {
    for (let i = 0; i < this.offSiteDayPassRegistrationItems.length; i++) {
      const controlArray = <FormArray>this.personnelDetailForm.get('selected_offsite_day_pass_items');
      controlArray.push(this.appendFormControlToDayPassItems());
    }

  }


  appendFormControlToDayPassItems(): FormGroup {
    return this.formBuilder.group({
      'day_pass_item_checked': [false],
      'day_pass_item_uuid': [''],
    });
  }

  patchValueToOffSiteRegistrationItems() {
    for (let i = 0; i < this.offSiteDayPassRegistrationItems.length; i++) {
      const controlArray = <FormArray>this.personnelDetailForm.get('selected_offsite_day_pass_items');
      // now we need to patch the value to each formgroup in array
      const itemFormGroup = <FormGroup>controlArray['controls'][i];

      const alreadyAddedCartItem = this.alreadyAddedRegistrationItems.value.find(eventItem =>
        eventItem.uuid === this.offSiteDayPassRegistrationItems[i]['uuid']);
      if (alreadyAddedCartItem) {
        itemFormGroup.patchValue({day_pass_item_uuid: this.offSiteDayPassRegistrationItems[i].uuid, day_pass_item_checked: true});

        //  here we also update the locallySelectedOffSiteRegistrationItems
        this.locallySelectedOffSiteRegistrationItems.push(alreadyAddedCartItem);


      }
    }
  }

  createAdditionalGuestForm(): FormGroup {
    return this.formBuilder.group({
      'event_attendee_id': '',
      'first_name': [this.attendeePersonnelDetail.first_name, Validators.required],
      'last_name': [this.attendeePersonnelDetail.last_name, Validators.required],
      'email': [this.attendeePersonnelDetail.email, [
        Validators.pattern(
          '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'), Validators.email]],
      'phone_number': [this.attendeePersonnelDetail.phone_number, Validators.required],
      'country': [this.attendeePersonnelDetail.country, Validators.required],
      'city': [this.attendeePersonnelDetail.city, Validators.required],
      'name_in_smart_card': [this.attendeePersonnelDetail.name_in_smart_card],
      'smart_card_number': [this.attendeePersonnelDetail.smart_card_number, [
        Validators.minLength(6), Validators.maxLength(6)]],
      'is_pwk': [this.attendeePersonnelDetail.is_pwk, Validators.required],
      'is_senior_citizen': [this.attendeePersonnelDetail.is_senior_citizen, Validators.required],


    })
      ;
  }


  addGuest(): void {
    this.f.push(this.createAdditionalGuestForm());
  }

  removeGuestDetailForm(index) {
    this.f.removeAt(index);
  }


  async generateFormArrayForGuest() {

    await this.performGenerationOfFormArrayForGuest().toPromise().then(response => {
    });
    // we need to patch value for guest form when number of guests are changed after loading too ,
    // to avoid loosing guest form data
    if (this.parentForm['numberOfGuests'].value > 0) {
      // this.patchValueToAdditionalGuestForm();
    }


  }

  performGenerationOfFormArrayForGuest() {
    const numberOfGuests = this.parentForm['numberOfGuests'].value;
    if (this.f.length < numberOfGuests) {
      for (let i = this.f.length; i < numberOfGuests; i++) {
        this.addGuest();
      }
    } else if (this.f.length > numberOfGuests) {
      for (let i = this.f.length; i > numberOfGuests; i--) {
        this.removeGuestDetailForm((i - 1)); /* since index starts from 0, we have to do (i-1) to get latest form control in order */
      }
    } else {
    }

    return this.numberOfGuests;
  }

  registerPersonnelDetail() {
    console.log('form is clicked');


    console.log('not validate till', this.personnelDetailForm.value);
    if (this.personnelDetailForm.valid) {
      this.formIsSubmitted = true;
      const formData = this.personnelDetailForm.value;
      console.log('valid form data', formData);

      this.registrationService.registerGuestAttendees(this.eventUuid, this.attendeeUuid, formData).subscribe(response => {
        if (response['code'] === 0) {
          this.formIsSubmitted = false;

          const errorList = [];
          for (const data of response['data']) {
            this.alertService.error(data['message']);
            errorList.push(data['message']);
            this.errorMessages = errorList;
            console.log(this.errorMessages, 'these are errors');
            if (data['status'] === 'ALREADY' && data['link']) {
              this.showLinkToViewEventRegistrationDetail = true;
              this.viewEventRegistrationDetailLink = data['link'];
            }
          }
        } else {

          this.alertService.success('Personnel detail are registered successfully');
          console.log(response['data']);
          if (this.parentForm['group_type'].value === 'OffSite') {
            console.log('offsite cart redirect', this.parentForm['group_type']);
            this.router.navigateByUrl(`/events/registration/cart-summary/${this.eventUuid}/${this.attendeeUuid}`);

          } else {
            this.router.navigateByUrl(`/events/registration/accommodation/${this.eventUuid}/${this.attendeeUuid}`);

          }
        }
      }, error1 => {
        this.formIsSubmitted = false;
      });
    } else {
      this.formSubmitValidationService.unMarkAllFormControls(this.personnelDetailForm);
      this.formSubmitValidationService.consoleLogErrors(this.personnelDetailForm);
    }
  }

  get f() {
    return this.personnelDetailForm.get('additionalGuests') as FormArray;
  }

  get parentForm() {
    return this.personnelDetailForm.controls;
  }

  get dayPassItemForm() {
    return this.personnelDetailForm.get('selected_offsite_day_pass_items') as FormArray;
  }

  updateSelectedRegistrationItems(data) {
    this.personnelDetailForm.patchValue({selected_registration_items: data});


  }

  alterValidatorForNumberOfAttendees() {
    this.updateSelectedRegistrationItems([]);

    if (this.parentForm['group_type'].value === 'OnSite') {
      this.parentForm['numberOfGuests'].setValidators([Validators.required]);
      this.parentForm['offsite_stay_type'].clearValidators();

      // reset the value of offsite_stay_type and selected_day_pass_items if was already selected previously
      this.personnelDetailForm.patchValue({offsite_stay_type: ''});


      this.updateSelectedRegistrationItems(this.allDaysRegistrationItems);

    } else if (this.parentForm['group_type'].value === 'OffSite') {

      this.parentForm['offsite_stay_type'].setValidators([Validators.required]);
      this.personnelDetailForm.patchValue({numberOfGuests: 0});
      // here we remove guest form for each one if already selected for OnSite previously,
      for (let i = 0; i < this.f.length; i++) {
        this.removeGuestDetailForm(i);
      }

    } else {
      //   this condition does not come, however else if condition applied to
      //   be sure on 'keyword' ie. OffSite and OnSite
    }
    // following lines actually update the validation errors for these controls
    this.parentForm['numberOfGuests'].updateValueAndValidity();
    this.parentForm['offsite_stay_type'].updateValueAndValidity();

  }


  patchValueToAdditionalGuestForm() {

    if (this.groupType.value === 'OffSite') {

      // first update the offsite_stay_type then only update the selected_registration_items
      this.personnelDetailForm.patchValue({
        group_type: this.groupType.value,
        offsite_stay_type: this.offsiteStayType.value,
        numberOfGuests: 0
      });
      this.personnelDetailForm.patchValue({selected_registration_items: this.alreadyAddedRegistrationItems.value});

      if (this.offsiteStayType.value === 'day_pass') {
        this.patchValueToOffSiteRegistrationItems();
      }

    }
    if (this.groupType.value === 'OnSite') {
      // first update the number of guest attendees so that guest form is generated
      this.personnelDetailForm.patchValue({
        group_type: this.groupType.value,
        selected_registration_items: this.alreadyAddedRegistrationItems.value,
        numberOfGuests: this.numberOfGuests.value
      });
      // now patch value to each guest attendee
      const controlArray = <FormArray>this.personnelDetailForm.get('additionalGuests');
      // we perform patching of guest form only if the guest attendees are not available
      if (this.guestAttendees.value.length) {

        for (let i = 0; i < this.guestAttendees.value.length; i++) {
          const attendee = this.guestAttendees.value[i];
          const guestFormGroup = <FormGroup>controlArray['controls'][i];

          guestFormGroup.patchValue({
            'event_attendee_id': attendee.id,
            'first_name': attendee.user.first_name,
            'last_name': attendee.user.last_name,
            'email': attendee.user.email,
            'phone_number': attendee.user.phone_number,
            'country': attendee.user.country,
            'city': attendee.user.city,
            'smart_card_number': attendee.smart_card_number,
            'is_pwk': attendee.is_pwk,
            'is_senior_citizen': attendee.is_senior_citizen
          });

        }
      }
    }

    // here after everything is patched we make loading false
    this.loading = false;
  }


  openUrlInNewTab(url) {
    OpenExternalUrlInNewTab.openUrlInNewTab(url);
  }

  allDayOffsiteTypeIsChecked() {
    return this.parentForm['offsite_stay_type'].value === 'all_days';
  }

  dayPassOffsiteTypeIsChecked() {
    return this.parentForm['offsite_stay_type'].value === 'day_pass';

  }


}
