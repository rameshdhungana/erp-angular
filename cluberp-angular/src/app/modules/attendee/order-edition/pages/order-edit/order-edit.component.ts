import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AttendeeEventRegistrationService} from '../../../../../core/services/attendee/attendee-event-registration.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormSubmitValidationService} from '../../../../../shared/services/form-submit-validation.service';
import {AlertService} from '../../../../../shared/services/alert.service';
import {EventCommonService} from '../../../../../core/services/common/event-common.service';
import {AttendeeOrderEditService} from '../../../../../core/services/attendee/attendee-order-edit.service';
import {AttendeePersonnelDetail} from '../../../../../core/models/attendee/attendee-personnel-detail.model';
import * as countryCodeList from '../../../../../../assets/json/country_code.json';
import {EventService} from '../../../../../core/services/dashboard/event.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {BillingService} from '../../../../../core/services/attendee/billing.service';
import {EventItemService} from '../../../../../core/services/dashboard/event-item.service';


@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {

  eventUuid: string;
  attendeeUuid: string;
  allAttendeeList = [];
  isMainAttendee: boolean;
  onlyOffSiteRegistration: boolean;
  numberOfAttendees: number;
  mainAttendeeUuid: string;
  groupType: string;
  netBalance: number;

  // registration related variables
  registrationForm: FormGroup;
  attendeePersonnelDetail = new AttendeePersonnelDetail();
  regisFormIsSubmitted: boolean;
  changeAttendeeButtonClicked: boolean;
  errorMessages = [];
  countryJsonList: any;
  allDaysRegistrationItems;

  changeOnSiteToOffsiteButtonClicked = false;
  cancelRegistrationButtonClicked = false;
  changeOffSiteToOnSiteButtonClicked = false;
  topupBalanceButtonClicked = false;


  // order related variables
  registrationOrderedItemList = [];
  accommodationOrderedItemList = [];
  transportationOrderedItemList = [];

  // accommodation related variable
  accomformIsSubmitted = false;
  accommodationItemList: [];
  accommodationForm: FormGroup;

  // transportation related variables
  transportationItemList: [];
  transportationForm: FormGroup;
  transformIsSubmitted = false;
  // modal referenced
  modalRef: BsModalRef;

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
    private orderEditService: AttendeeOrderEditService,
    private eventService: EventService,
    private modalService: BsModalService,
    private billingService: BillingService,
    private eventItemService: EventItemService,
  ) {
  }

  ngOnInit() {
    this.eventUuid = this.activatedRoute.snapshot.paramMap.get('eventUuid');
    this.attendeeUuid = this.activatedRoute.snapshot.paramMap.get('attendeeUuid');
    this.getOrderEditData();
    this.buildAccommodationForm();
    this.buildTransportationForm();
    this.buildRegistrationForm();
    this.countryJsonList = Array(countryCodeList['default']);
    this.alertService.success('your payment has been done successfully');


  }

  async getOrderEditData() {
    await this.orderEditService.getOrderEditData(this.eventUuid, this.attendeeUuid).toPromise().then(response => {
      this.isMainAttendee = response['data']['is_main_attendee'];
      this.mainAttendeeUuid = response['data']['main_attendee_uuid'];

      // if attendee is not mainAttendee then we redirect him/her to order summary page ,since nothing can be done by guest attende
      // except viewing the order summary in edit mode too
      if (!this.isMainAttendee) {
        this.router.navigateByUrl(`/events/order/summary/${this.eventUuid}/${this.mainAttendeeUuid}`);
      }

      this.groupType = response['data']['group_type'];
      this.onlyOffSiteRegistration = response['data']['only_offsite_registration'];
      this.allAttendeeList = response['data']['all_attendees'];
      this.numberOfAttendees = response['data']['number_of_attendees'];
      this.registrationOrderedItemList = response['data']['registration_items'];
      this.accommodationOrderedItemList = response['data']['accommodation_items'];
      this.transportationOrderedItemList = response['data']['transportation_items'];
      this.netBalance = response['data']['net_balance'];


    });
    // we generate the accommodation , transportation  form only if the group_type is OnSite
    if (this.groupType === 'OnSite') {
      this.getAccommodationItemListForAttendees();

      //  now building transportation form
      this.generateTransportArrayForEachAttendee(this.numberOfAttendees);
    }

    // here we generate registrationformarray , this inlcludes the list of attendees for both onsite and offsite
    // hence is not included in above condition
    this.generateRegistrationFormArray(this.allAttendeeList.length);

    this.loading = false;
  }

  // start of registration related items

  buildRegistrationForm() {
    this.registrationForm = this.formBuilder.group({
      'personnelDetail': this.formBuilder.array([])
    });
  }

  createPersonnelDetailFormGroup(): FormGroup {
    return this.formBuilder.group({
      'first_name': [this.attendeePersonnelDetail.first_name],
      'last_name': [this.attendeePersonnelDetail.last_name],
      'email': [this.attendeePersonnelDetail.email],
      'phone_number': [this.attendeePersonnelDetail.phone_number, Validators.required],
      'country': [this.attendeePersonnelDetail.country],
      'is_pwk': [this.attendeePersonnelDetail.is_pwk],
      'is_senior_citizen': [this.attendeePersonnelDetail.is_senior_citizen],
      'city': [this.attendeePersonnelDetail.city],
      'smart_card_number': [this.attendeePersonnelDetail.smart_card_number],
      'name_in_smart_card': [this.attendeePersonnelDetail.smart_card_number],
      'selected_registration_items': [''],
      'change_attendee_button_clicked': [false],
      'removed_attendee_uuid': [''],
      'group_type': [''],
      'note': ['', [Validators.required, Validators.maxLength(1000)]]


    });
  }


  changeAttendeeButton(index) {
    // this.regisForm.insert(index, this.createPersonnelDetailFormGroup());
    this.changeAttendeeButtonClicked = true;
    const eachForm = this.regisForm['controls'][index] as FormGroup;
    eachForm.patchValue({
      change_attendee_button_clicked: true,
      removed_attendee_uuid: this.registrationOrderedItemList[index].event_attendee.uuid,
      group_type: 'OnSite'
    });
    // if is change AttendeeButton is clicked we need to make the form fields validators required
    Object.keys(eachForm.controls).forEach(key => {
      const control = eachForm.get(key);
      if (control instanceof FormControl) {
        // is a FormControl
        control.setValidators([Validators.required]);
      }
      if (key === 'smart_card_number') {
        control.setValidators([Validators.minLength(6), Validators.maxLength(6)]);
      }
      if (key === 'name_in_smart_card') {
        control.clearValidators();
      }
      if (key === 'email') {
        control.setValidators([
          Validators.pattern(
            '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'), Validators.email]);

      }
    });

    eachForm.updateValueAndValidity();

    //   now we get all day registration item( registration ticket)
    this.getAllDaysRegistrationItems();


  }

  resetAttendeeChange(index) {
    const eachForm = this.regisForm['controls'][index] as FormGroup;
    eachForm.reset();
    // once form is reset, every controls values gets null , hence we need to patch  'is_pwk':
    // is_senior_citizen': to false to initialize to avoid 0validation error when  user do not tick these fields
    eachForm.patchValue({is_pwk: false, is_senior_citizen: false});
    eachForm.clearValidators();
    eachForm.updateValueAndValidity();
  }

  generateRegistrationFormArray(totalLength) {
    for (let i = 0; i < totalLength; i++) {

      this.regisForm.push(this.createPersonnelDetailFormGroup());
    }
  }

  changeAttendeeConfirmed(guestForm) {
    guestForm.patchValue({selected_registration_items: this.allDaysRegistrationItems});
    this.editPersonnelDetail(guestForm);

  }

  getAllDaysRegistrationItems() {
    this.eventService.getAllDaysRegistrationItems(this.eventUuid).subscribe(response => {
      this.allDaysRegistrationItems = response['data'];
    });
  }

  editPersonnelDetail(guestForm) {
    if (guestForm.valid) {
      this.regisFormIsSubmitted = true;
      const formData = guestForm.value;

      this.orderEditService.changeAttendee(this.eventUuid, this.attendeeUuid, formData).subscribe(response => {
        if (response['code'] === 0) {
          this.regisFormIsSubmitted = false;

          const errorList = [];
          for (const data of response['data']) {
            errorList.push(data['message']);
            this.errorMessages = errorList;

          }
        } else {

          this.alertService.success('Attendee is changed successfully.');
          this.regisFormIsSubmitted = false;
          guestForm.reset();
          this.viewOrderEditSummary();

        }
      }, error1 => {
        this.regisFormIsSubmitted = false;
      });
    } else {
      this.formSubmitValidationService.unMarkAllFormControls(guestForm);
      this.formSubmitValidationService.consoleLogErrors(guestForm);
    }
  }

  get regisForm() {
    return this.registrationForm.get('personnelDetail') as FormArray;
  }

  hasPermissionToChangeAttendee(attendee) {
    return this.isMainAttendee && attendee.uuid !== this.mainAttendeeUuid;
  }


  // end of the registration items


  buildAccommodationForm() {
    this.accommodationForm = this.formBuilder.group(
      {
        'accommodation_item_uuid': ['', [Validators.required]]
      }
    );

  }

  getAccommodationItemListForAttendees() {
    this.eventItemService.getEventItemList(this.eventUuid, {
      'item_sharing_count': this.numberOfAttendees,
      'group_type': 'OnSite',
      'group__name': 'Accommodation',
      'event_registration_type__is_public': true,
      'no_page': true
    }).toPromise().then(response => {
      this.accommodationItemList = response['data'];
      //   now we need to exclude the item already added into ordered item form the accommodationItemList
      this.excludeOrderedItemFromAccommodationItemList(this.accommodationItemList);

    });

  }

  excludeOrderedItemFromAccommodationItemList(accommodationItemList) {
    const bookedRoom = this.accommodationOrderedItemList[0];
    // first we find its index and remove it from the list
    const index = accommodationItemList.findIndex(item => item.uuid === bookedRoom.event_item.uuid);
    // remove the item if index  is not -1
    if (index !== -1) {
      this.accommodationItemList.splice(index, 1);

    }


  }

  cancelAccommodationChange() {
    this.accommodationForm.reset();
  }

  get f() {
    return this.accommodationForm.controls;
  }

  changeAccommodationItem() {


    if (this.accommodationForm.valid) {
      this.accomformIsSubmitted = true;
      const formData = this.accommodationForm.value;

      this.orderEditService.changeAccommodation(this.eventUuid, this.attendeeUuid, formData).subscribe(response => {
        if (response['code'] === 1) {
          this.alertService.success(response['message']);
          this.accommodationForm.reset();
          this.accomformIsSubmitted = false;
          this.viewOrderEditSummary();

        }


      }, error1 => {
        this.accomformIsSubmitted = false;

      });
    } else {
      this.alertService.error('Please select one of accommodation item.');
      this.formSubmitValidationService.unMarkAllFormControls(this.accommodationForm);
      this.formSubmitValidationService.consoleLogErrors(this.accommodationForm);
    }


  }

  // accommodation related functions ends

  // transportation related functions starts

  buildTransportationForm() {
    this.transportationForm = this.formBuilder.group(
      {
        'attendeesFormArray': this.formBuilder.array([])
      }
    );
    return;
  }

  // for first layer of nesting array form

  createEachFormArray(): FormGroup {
    return this.formBuilder.group({
      'not_required': [false],
      'attendee_uuid': ['', Validators.required],
      'transportation_item_list': this.formBuilder.array([])
    });
  }


  get childArrayForm() {
    return this.transportationForm.get('attendeesFormArray') as FormArray;
  }

  async generateTransportArrayForEachAttendee(totalNumber) {
    for (let i = 0; i < totalNumber; i++) {

      this.childArrayForm.push(this.createEachFormArray());
    }
    // we call this function only after the nested form for each has been generated
    await this.getTransportationItemListForAttendees();
    return;

  }

  generateTransportationItemArray() {
    for (let i = 0; i < this.numberOfAttendees; i++) {
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
    // now we patch value to each array form for each attendee for each items
    this.patchValueToTransportationForm(this.transportationOrderedItemList);


  }


  patchValueToTransportationForm(alreadyAddedTransportationItems) {
    for (let i = 0; i < this.numberOfAttendees; i++) {
      const eachFormGroup = <FormGroup>this.transportationForm.get('attendeesFormArray')['controls'][i];
      const controlArray = <FormArray>this.transportationForm.get('attendeesFormArray')['controls'][i].get('transportation_item_list');
      let alreadyAddedItemCount = 0;
      for (let j = 0; j < this.transportationItemList.length; j++) {
        let itemFormGroup = <FormGroup>controlArray['controls'][j];

        // if not_required is clicked, all transportation_item_list array is removed from control,
        // so if the cancel changes is clicked , itemFormGroup at given index becomes undefined ,
        // raising error , hence we regenerate it by pushing at given index and reassign it to variable
        if (!itemFormGroup) {
          controlArray.insert(j, this.appendEachItemNestedForm());
          itemFormGroup = <FormGroup>controlArray['controls'][j];

        }

        const alreadyAddedCartItem = alreadyAddedTransportationItems.find(item =>
          item.event_item.uuid === this.transportationItemList[j]['uuid'] &&
          item.event_attendee.uuid === this.allAttendeeList[i].uuid);
        if (alreadyAddedCartItem) {
          alreadyAddedItemCount = alreadyAddedItemCount + 1;

          eachFormGroup.patchValue({attendee_uuid: this.allAttendeeList[i].uuid});
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
              departure_datetime: alreadyAddedCartItem.transportation_info.departure_datetime
            });
          }

          if (this.transportationItemList[j]['ask_for_pickup_location']) {
            itemFormGroup.patchValue({
              pickup_location: alreadyAddedCartItem.transportation_info.pickup_location
            });
          }

        }
      }
      // none items are added already to items, it means not_required was clicked previously hence , we need to patch value
      // with not_required = true and attendee_uuid
      if (alreadyAddedItemCount === 0) {
        eachFormGroup.patchValue({not_required: true, attendee_uuid: this.allAttendeeList[i].uuid});
        //  if not_required is checked , we need to remove the transportation_item_list , since it is generated but
        //   hidden, hence we call function to remove the generated transportation_item_list for attendee
        this.removeTransportationItemOptionsOfParticularAttendee(controlArray);


      }

    }
  }


  notRequiredOptionClicked(index, checked) {
    const eachFormGroup = this.childArrayForm.controls[index] as FormGroup;
    const controlArray = eachFormGroup.get('transportation_item_list') as FormArray;

    // clear required validator if not required ticked
    eachFormGroup.get('attendee_uuid').clearValidators();
    eachFormGroup.get('attendee_uuid').updateValueAndValidity();

    if (checked) {
      this.removeTransportationItemOptionsOfParticularAttendee(controlArray);
    } else {
      this.regenerateTransportationItemOptionsOfParticularAttendee(controlArray);
    }

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

  editTransportationItems() {
    if (this.transportationForm.valid) {
      this.transformIsSubmitted = true;
      const formData = this.transportationForm.value['attendeesFormArray'];

      this.orderEditService.changeTransportationItems(this.eventUuid, this.attendeeUuid, formData).subscribe(response => {
        this.alertService.success('Transportation Items are changed  successfully');
        this.viewOrderEditSummary();
        this.transformIsSubmitted = false;


      }, error1 => {
        this.transformIsSubmitted = false;
      });

    } else {
      this.alertService.error('Incomplete or Invalid data. Please check entered data.');
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

  cancelTransportationChange() {
    this.transportationForm.reset();
    this.patchValueToTransportationForm(this.transportationOrderedItemList);
  }


  // transportation related functions end
  viewOrderEditSummary() {
    this.router.navigateByUrl(`/events/order/edit-summary/${this.eventUuid}/${this.attendeeUuid}`);

  }


//   start of modal related tasks
  OpenModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});

  }

  closeModal(): void {
    this.modalRef.hide();
  }

  // end of modal specific task
  changeOnSiteToOffsiteRegistration() {
    this.changeOnSiteToOffsiteButtonClicked = true;
    this.loading = true;

    this.orderEditService.changeOnSiteToOffsiteRegistration(this.eventUuid, this.attendeeUuid).subscribe(response => {
        this.changeOnSiteToOffsiteButtonClicked = false;
        this.viewOrderEditSummary();
      },
      error1 => {
        this.changeOnSiteToOffsiteButtonClicked = false;
        this.loading = false;

      });
  }


  cancelRegistration() {
    this.cancelRegistrationButtonClicked = true;
    this.loading = true;
    this.orderEditService.cancelRegistration(this.eventUuid, this.attendeeUuid).subscribe(response => {
        this.cancelRegistrationButtonClicked = false;
        this.viewOrderEditSummary();
      },
      error1 => {
        this.cancelRegistrationButtonClicked = false;
        this.loading = false;

      });

  }

  changeOffSiteToOnSiteRegistration() {
    this.changeOffSiteToOnSiteButtonClicked = true;
    this.loading = true;

    this.orderEditService.changeOffSiteToOnSiteRegistration(this.eventUuid, this.attendeeUuid).subscribe(response => {
        this.changeOffSiteToOnSiteButtonClicked = false;
        this.redirectToOnsiteRegistration();
      },
      error1 => {
        this.changeOffSiteToOnSiteButtonClicked = false;
        this.loading = false;

      });
  }

  redirectToOnsiteRegistration() {
    this.closeModal();
    this.router.navigateByUrl(`events/registration/accommodation-type/${this.eventUuid}/${this.attendeeUuid}`);
  }

//  end of modal related tasks


  openPaymentCheckout() {
    const handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
      locale: 'auto',

      token: function (token: any) {
        // You can access the token ID with `token.id`.

        const postData = {'event_uuid': this.eventUuid, 'main_attendee_uuid': this.attendeeUuid, 'token': token};

        // Get the token ID to your server-side code for use.
        this.billingService.topUpBalance(postData).subscribe(response => {
          this.alertService.success(response['messsage']);


        }, error1 => {
          this.alertService.success('Something Went Wrong !!');
        });

      }.bind(this)
    });

    handler.open({
        name: 'Amaaroo',
        description: 'Card Details',
        zipCode: true,
        billingAddress: true,
        panelLabel: 'Submit',
        allowRememberMe: false,
        amount: 10000,
        closed: () => {
        }
      }
    );
  }


}

