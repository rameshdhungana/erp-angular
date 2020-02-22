import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AttendeeEventRegistrationService} from '../../../../../core/services/attendee/attendee-event-registration.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormSubmitValidationService} from '../../../../../shared/services/form-submit-validation.service';
import {AlertService} from '../../../../../shared/services/alert.service';
import {HttpClient} from '@angular/common/http';
import {EventCommonService} from '../../../../../core/services/common/event-common.service';
import {EventItemService} from '../../../../../core/services/dashboard/event-item.service';

@Component({
  selector: 'app-book-transportation',
  templateUrl: './book-transportation.component.html',
  styleUrls: ['./book-transportation.component.css']
})
export class BookTransportationComponent implements OnInit {

  eventUuid: string;
  attendeeUuid: string;
  allAttendeesDetail: any;
  transportationItemList: [];

  transportationForm: FormGroup;
  formIsSubmitted = false;
  eventTimeZone: string;
  eventStartDate: Date;
  eventEndDate: Date;

  // loading variable
  loading = true;

  config = {
    displayKey: 'location',
    search: true,
    height: 'auto',
    placeholder: 'Select Pickup Location',
    customComparator: () => {
    },
    // limitTo: options.length,
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Select Pickup Location',
    searchOnKey: 'location'
  };

  constructor(
    private attendeeEventService: AttendeeEventRegistrationService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private formSubmitValidationService: FormSubmitValidationService,
    private  router: Router,
    private registrationService: AttendeeEventRegistrationService,
    private alertService: AlertService,
    private eventCommonService: EventCommonService,
    private eventItemService: EventItemService
  ) {
  }

  ngOnInit() {
    this.eventUuid = this.activatedRoute.snapshot.paramMap.get('eventUuid');
    this.attendeeUuid = this.activatedRoute.snapshot.paramMap.get('attendeeUuid');
    this.buildForm();
    this.getEventTimeZone();
    this.getRegisteredAttendeesDetail().then(() => {
      //  do nothing for now
    });

  }


  buildForm() {
    this.transportationForm = this.formBuilder.group(
      {
        'attendeesFormArray': this.formBuilder.array([])
      }
    );
  }

  // for first layer of nesting array form

  createEachFormArray(): FormGroup {
    return this.formBuilder.group({
      'not_required': [''],
      'attendee_uuid': ['', Validators.required],
      'transportation_item_list': this.formBuilder.array([])
    });
  }


  get childArrayForm() {
    return this.transportationForm.get('attendeesFormArray') as FormArray;
  }

  async generateFormArrayForEachAttendee(totalNumber) {
    for (let i = 0; i < totalNumber; i++) {

      this.childArrayForm.push(this.createEachFormArray());
    }
    return;

  }

  generateTransportationItemArray() {
    for (let i = 0; i < this.allAttendeesDetail['number_of_attendees']; i++) {
      const control = <FormArray>this.transportationForm.get('attendeesFormArray')['controls'][i].get('transportation_item_list');
      for (let j = 0; j < this.transportationItemList.length; j++) {
        control.push(this.appendEachItemNestedForm());
      }
    }
  }


  appendEachItemNestedForm(): FormGroup {
    return this.formBuilder.group({
      'transportation_item_checked': [false],
      'transportation_item_uuid': [''],
      'arrival_datetime': [''],
      'departure_datetime': [''],
      'pickup_location': ['']
    });
  }


  async getRegisteredAttendeesDetail() {
    await this.attendeeEventService.getRegisteredAttendeesDetail(this.eventUuid, this.attendeeUuid).toPromise(
    ).then(
      response => {
        this.allAttendeesDetail = response['data'];

        // if the group_type of main_attendee is offsite , main_attendee can not access the transportation page , hence
        // we need to redirect to cart-summary page
        if (this.allAttendeesDetail.group_type === 'OffSite') {
          if (!response['data']['changed_to_onsite']) {

            this.router.navigateByUrl(`events/registration/cart-summary/${this.eventUuid}/${this.attendeeUuid}`);
          } else {
            // when main_attendee has changed to onsite but group_type is not updated since order is not confirmed
            // however he/she might have added guest hence ,we need to generate transportation form for them
            // now we generate form  array for each attendee
            this.generateFormArrayForEachAttendee(response['data']['number_of_attendees']).then(() => {
              //  do nothing, just written to avoid IDE warning
            });
          }
        } else {
          // now we generate form  array for each attendee
          this.generateFormArrayForEachAttendee(response['data']['number_of_attendees']).then(() => {
            //  do nothing, just written to avoid IDE warning
          });
        }


      });
    // we call this function only after the nested form for each has been generated
    this.getTransportationItemListForAttendees();


  }


  async getTransportationItemListForAttendees() {

    await this.eventItemService.getEventItemList(this.eventUuid, {
      'group_type': 'OnSite',
      'group__name': 'Transportation',
      'event_registration_type__is_public': true,
      'no_page': true
    }).toPromise().then(response => {
      this.transportationItemList = response['data'];
      this.generateTransportationItemArray();


    });
    // now we get list of already added item List to cart if any ( for handling of back and forth using
    // browser and edit purpose)
    this.getAlreadyAddedTransportationCartItems();


  }

  getEventTimeZone() {
    this.eventCommonService.getEventTimeZone(this.eventUuid).subscribe(response => {
      this.eventTimeZone = response['data']['timezone'];


    });
  }

  getAlreadyAddedTransportationCartItems() {
    this.registrationService.getAlreadyAddedTransportationCartItems(this.eventUuid, this.attendeeUuid).subscribe(response => {
      const alreadyAddedTransportationItems = response['data']['already_added_transportation_cart_items'];
      this.patchValueToTransportationForm(alreadyAddedTransportationItems);
    });
  }

  patchValueToTransportationForm(alreadyAddedTransportationItems) {
    for (let i = 0; i < this.allAttendeesDetail['number_of_attendees']; i++) {
      const eachFormGroup = <FormGroup>this.transportationForm.get('attendeesFormArray')['controls'][i];
      const controlArray = <FormArray>this.transportationForm.get('attendeesFormArray')['controls'][i].get('transportation_item_list');
      for (let j = 0; j < this.transportationItemList.length; j++) {
        const itemFormGroup = <FormGroup>controlArray['controls'][j];
        const alreadyAddedCartItem = alreadyAddedTransportationItems.find(item =>
          item.event_item.uuid === this.transportationItemList[j]['uuid'] &&
          item.event_attendee.uuid === this.allAttendeesDetail.attendees[i].uuid);
        if (alreadyAddedCartItem) {
          eachFormGroup.patchValue({attendee_uuid: this.allAttendeesDetail.attendees[i].uuid});
          itemFormGroup.patchValue({
            transportation_item_checked: true,
            transportation_item_uuid: alreadyAddedCartItem.event_item.uuid,
          });
          if (this.transportationItemList[j]['ask_for_arrival_datetime']) {
            itemFormGroup.patchValue({
              arrival_datetime: alreadyAddedCartItem.transportation_info.arrival_datetime
            });
          }
          if (this.transportationItemList[j]['ask_for_departure_datetime']) {
            itemFormGroup.patchValue({
              departure_datetime: alreadyAddedCartItem.transportation_info.departure_datetime,
            });
          }
          if (this.transportationItemList[j]['ask_for_pickup_location']) {

            itemFormGroup.patchValue({
              pickup_location: alreadyAddedCartItem.transportation_info.pickup_location
            });
          }

        }
      }
    }
    //   finally after patching  value we make loading variable false
    this.loading = false;
  }


  changeAttendeeTab() {
  }

  notRequiredOptionClicked(index, checked) {
    const eachFormGroup = this.childArrayForm.controls[index] as FormGroup;
    const controlArray = eachFormGroup.get('transportation_item_list') as FormArray;

    if (checked) {
      this.removeTransportationItemOptionsOfParticularAttendee(controlArray);
      // clear required validator if not required ticked
      eachFormGroup.get('attendee_uuid').clearValidators();
    } else {
      eachFormGroup.get('attendee_uuid').setValidators([Validators.required]);

      this.regenerateTransportationItemOptionsOfParticularAttendee(controlArray);
    }
    eachFormGroup.get('attendee_uuid').updateValueAndValidity();


  }

  removeTransportationItemOptionsOfParticularAttendee(controlArray) {
    for (let i = this.transportationItemList.length; i > 0; i--) {

      controlArray.removeAt((i - 1));
    }
  }

  regenerateTransportationItemOptionsOfParticularAttendee(controlArray) {
    for (let i = 0; i < this.transportationItemList.length; i++) {

      controlArray.push(this.appendEachItemNestedForm());
    }
  }

  get f() {
    return this.transportationForm.controls;
  }

  registerTransportationItems() {
    if (this.transportationForm.valid) {
      this.formIsSubmitted = true;
      const formData = this.transportationForm.value['attendeesFormArray'];

      this.registrationService.registerTransportationItems(this.eventUuid, this.attendeeUuid, formData).subscribe(response => {
        this.alertService.success('Transportation Items are added to cart successfully');
        this.router.navigateByUrl(`/events/registration/cart-summary/${this.eventUuid}/${this.attendeeUuid}`);


      }, error1 => {
        this.formIsSubmitted = false;
      });

    } else {
      this.alertService.error('Please choose transportation items or check `Not Required` for each attendees.');
      this.formSubmitValidationService.unMarkAllFormControls(this.transportationForm);
      for (let i = 0; i < this.childArrayForm.length; i++) {
        this.formSubmitValidationService.consoleLogErrors(this.childArrayForm.controls[i] as FormGroup);
      }
    }
  }


  addOrRemoveSelectedItemList(checked, eventItem, attendeeUuid, eachFormIndex, itemIndexForm) {
    const eachFormGroup = this.childArrayForm.controls[eachFormIndex] as FormGroup;
    const itemArray = eachFormGroup.get('transportation_item_list') as FormArray;
    const itemFormGroup = itemArray.controls[itemIndexForm] as FormGroup;


    if (checked) {
      // we make each form-control required when checked
      // pickup location required true only when we need to ask for it
      if (eventItem.ask_for_pickup_location && eventItem['transportation_pickup_locations'].length) {
        itemFormGroup.controls['pickup_location'].setValidators([Validators.required]);

      }
      // arrival , departure time only true when we need to ask for it
      if (eventItem.ask_for_arrival_datetime) {
        itemFormGroup.controls['arrival_datetime'].setValidators([Validators.required]);
      }
      if (eventItem.ask_for_departure_datetime) {
        itemFormGroup.controls['departure_datetime'].setValidators([Validators.required]);
      }
      itemFormGroup.controls['transportation_item_uuid'].setValidators([Validators.required]);

    } else {
      itemFormGroup.controls['transportation_item_uuid'].clearValidators();
      itemFormGroup.controls['arrival_datetime'].clearValidators();
      itemFormGroup.controls['departure_datetime'].clearValidators();
      itemFormGroup.controls['pickup_location'].clearValidators();
      itemFormGroup.reset();


    }
    eachFormGroup.patchValue({attendee_uuid: attendeeUuid});

    // update the transportation_item_uuid in itemFormGroup
    itemFormGroup.patchValue({transportation_item_uuid: eventItem.uuid});
    // following updates the validation
    itemFormGroup.controls['arrival_datetime'].updateValueAndValidity();
    itemFormGroup.controls['transportation_item_uuid'].updateValueAndValidity();
    itemFormGroup.controls['departure_datetime'].updateValueAndValidity();
    itemFormGroup.controls['pickup_location'].updateValueAndValidity();


  }

  onSelectionOfPickupLocations(event) {
    //   do nothing
  }

  editAccommodation() {
    this.router.navigateByUrl(`/events/registration/accommodation/${this.eventUuid}/${this.attendeeUuid}`);

  }
}
