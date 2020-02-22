import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AttendeeEventRegistrationService} from '../../../../../core/services/attendee/attendee-event-registration.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormSubmitValidationService} from '../../../../../shared/services/form-submit-validation.service';
import {AlertService} from '../../../../../shared/services/alert.service';
import {EventItemService} from '../../../../../core/services/dashboard/event-item.service';

@Component({
  selector: 'app-book-accommodation',
  templateUrl: './book-accommodation.component.html',
  styleUrls: ['./book-accommodation.component.css'],
})
export class BookAccommodationComponent implements OnInit {
  eventUuid: string;
  attendeeUuid: string;
  allAttendeesDetail: any;
  accommodationItemList: [];
  alreadyAddedAccommodationCartItems = [];

  accommodationForm: FormGroup;
  formIsSubmitted = false;
  loading = true;


  constructor(
    private attendeeEventService: AttendeeEventRegistrationService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private formSubmitValidationService: FormSubmitValidationService,
    private  router: Router,
    private registrationService: AttendeeEventRegistrationService,
    private alertService: AlertService,
    private eventItemService: EventItemService
  ) {
  }

  ngOnInit() {
    this.eventUuid = this.activatedRoute.snapshot.paramMap.get('eventUuid');
    this.attendeeUuid = this.activatedRoute.snapshot.paramMap.get('attendeeUuid');
    this.getRegisteredAttendeesDetail();
    this.buildForm();


  }

  buildForm() {
    this.accommodationForm = this.formBuilder.group(
      {
        'accommodation_item_uuid': ['', [Validators.required]]
      }
    );
  }

  async getRegisteredAttendeesDetail() {
    await this.attendeeEventService.getRegisteredAttendeesDetail(this.eventUuid, this.attendeeUuid).toPromise().then(response => {
      this.allAttendeesDetail = response['data'];

      // if the group_type of main_attendee is offsite , main_attendee can not access the transportation page , hence
      // we need to redirect to cart-summary page
      if (this.allAttendeesDetail.group_type === 'OffSite') {
        if (!response['data']['changed_to_onsite']) {
          this.router.navigateByUrl(`events/registration/cart-summary/${this.eventUuid}/${this.attendeeUuid}`);
        }
      }

      this.getAlreadyAddedAccommodationCartItems();


    });
    this.getAccommodationItemListForAttendees();

  }

  getAccommodationItemListForAttendees() {

    this.eventItemService.getEventItemList(this.eventUuid, {
      'item_sharing_count': this.allAttendeesDetail.number_of_attendees,
      'group_type': 'OnSite',
      'group__name': 'Accommodation',
      'event_registration_type__is_public': true,
      'no_page': true
    }).subscribe(response => {
      this.accommodationItemList = response['data'];
    });
  }


  changeAttendeeTab() {
  }

  get f() {
    return this.accommodationForm.controls;
  }

  getAlreadyAddedAccommodationCartItems() {
    this.registrationService.getAlreadyAddedAccommodationCartItems(this.eventUuid, this.attendeeUuid).subscribe(response => {
      this.alreadyAddedAccommodationCartItems = response['data']['already_added_accommodation_cart_items'];
      this.patchValueToAccommodationForm();
      // finally after value is patched make loading false
      this.loading = false;


    });
  }

  patchValueToAccommodationForm() {
    if (this.alreadyAddedAccommodationCartItems.length) {
      this.f['accommodation_item_uuid'].patchValue(this.alreadyAddedAccommodationCartItems[0].event_item.uuid);

    }
  }


  registerAccommodationItem() {
    if (this.accommodationForm.valid) {
      this.formIsSubmitted = true;
      const formData = this.accommodationForm.value;

      this.registrationService.registerAccommodationItems(this.eventUuid, this.attendeeUuid, formData).subscribe(response => {
        this.alertService.success('Accommodation Item is added to cart successfully');
        this.router.navigateByUrl(`/events/registration/transportation/${this.eventUuid}/${this.attendeeUuid}`);


      }, error1 => {
        this.formIsSubmitted = false;

      });
    } else {
      this.alertService.error('Please select one of accommodation item.');
      this.formSubmitValidationService.unMarkAllFormControls(this.accommodationForm);
      this.formSubmitValidationService.consoleLogErrors(this.accommodationForm);
    }


  }


}
