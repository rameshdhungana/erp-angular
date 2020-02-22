import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventService} from '../../../../../core/services/dashboard/event.service';
import {AlertService} from '../../../../../shared/services/alert.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EventRegistration} from '../../../../../core/models';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormSubmitValidationService} from '../../../../../shared/services/form-submit-validation.service';
import {EventCommonService} from '../../../../../core/services/common/event-common.service';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',

  styleUrls: ['./create-event.component.css'],

})
export class CreateEventComponent implements OnInit {
  eventCreationForm: FormGroup;
  eventRegistrationModel = new EventRegistration();
  public Editor = ClassicEditor;
  public eventOrganizerList = [];
  public eventTypeList = [];
  public eventCategoryList = [];
  createEventButtonClicked = false;
  editEventButtonClicked = false;
  eventDetail: any;
  // to indicate wheather it is create mode of edit mode as sample component is used for create and edit as well by conditioning
  eventUuid: string;

  disabled = false;
  config = {
    displayKey: 'name',
    search: true,
    height: 'auto',
    placeholder: 'Select',
    customComparator: () => {
    },
    // limitTo: options.length,
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Search',
    searchOnKey: 'name'
  };

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private alertService: AlertService,
    private router: Router,
    private formValidationService: FormSubmitValidationService,
    private activatedRoute: ActivatedRoute,
    private eventCommonService: EventCommonService
  ) {
  }


  get f() {
    return this.eventCreationForm.controls;
  }

  ngOnInit() {
    this.eventUuid = this.activatedRoute.snapshot.paramMap.get('eventUuid');
    if (this.eventUuid) {
      this.getEventDetailForEditMode();
    }
    this.buildForm();
    this.getEventTypeList();
    this.getEventOrganizerList();
    this.getEventCategoryList();


  }

  ngAfterContentChecked() {
    this.f['allow_group_registration'].valueChanges.subscribe(data => {
      // Do something
      if (this.f['allow_group_registration'].value) {
        this.f['max_group_limit'].setValidators([Validators.required, Validators.min(1)]);

      } else {
        this.f['max_group_limit'].clearValidators();

      }
      this.f['max_group_limit'].updateValueAndValidity();


    });

    this.f['is_single_day_event'].valueChanges.subscribe(data => {
      // Do something
      if (this.f['is_single_day_event'].value) {
        this.f['start_time'].setValidators([Validators.required]);
        this.f['end_time'].setValidators([Validators.required]);
      } else {
        this.f['start_time'].clearValidators();
        this.f['end_time'].clearValidators();
      }
      this.f['start_time'].updateValueAndValidity();
      this.f['end_time'].updateValueAndValidity();

    });

  }


  getEventTypeList() {
    this.eventService.getEventTypeList({'no_page': true}).subscribe(response => {
      this.eventTypeList = response['data'];
    });
  }

  getEventOrganizerList() {
    this.eventService.getEventOrganizerList({'no_page': true}).subscribe(response => {
      this.eventOrganizerList = response['data'];
    });
  }

  getEventCategoryList() {
    this.eventService.getEventCategoryList({'no_page': true}).subscribe(response => {
      this.eventCategoryList = response['data'];
    });
  }

  getEventDetailForEditMode() {
    this.eventCommonService.getEventDetail(this.eventUuid).subscribe(response => {
      //   now we need to patch value to form
      this.eventCreationForm.patchValue({
        title: response['data']['title'],
        description: response['data']['description'],
        start_date: response['data']['start_date'],
        end_date: response['data']['end_date'],
        early_bird_date: response['data']['early_bird_date'],
        is_single_day_event: response['data']['is_single_day_event'],
        start_time: response['data']['start_time'],
        end_time: response['data']['end_time'],
        venue_location: response['data']['venue_location'],
        label: response['data']['label'],
        type: response['data']['type'],
        category: response['data']['category'],
        organizer: response['data']['organizer'],
        title_images: response['data']['title_images'],
        description_images: response['data']['description_images'],
        summary: response['data']['summary'],
        allow_group_registration: response['data']['allow_group_registration'],
        max_group_limit: response['data']['max_group_limit'],
        status: response['data']['status'],
        show_total_capacity: response['data']['show_total_capacity'],
        show_remaining_seats: response['data']['show_remaining_seats'],
        is_published: response['data']['is_published'],
        show_start_time: response['data']['show_start_time'],
        show_end_time: response['data']['show_end_time'],
      });

    });
  }

  // patchValueForEventEditMode() {
  // }


  buildForm() {
    this.eventCreationForm = this.formBuilder.group({
      title: [this.eventRegistrationModel.title, Validators.required],
      description: [this.eventRegistrationModel.description, Validators.required],
      start_date: [this.eventRegistrationModel.start_date, Validators.required],
      end_date: [this.eventRegistrationModel.end_date],
      early_bird_date: [this.eventRegistrationModel.early_bird_date],
      is_single_day_event: [this.eventRegistrationModel.is_single_day_event],
      start_time: [this.eventRegistrationModel.start_time],
      end_time: [this.eventRegistrationModel.end_time],
      venue_location: [this.eventRegistrationModel.venue_location, Validators.required],
      label: [this.eventRegistrationModel.label],
      type: [this.eventRegistrationModel.title, Validators.required],
      category: [this.eventRegistrationModel.category, Validators.required],
      organizer: [this.eventRegistrationModel.organizer, Validators.required],
      title_images: [this.eventRegistrationModel.title_images],
      description_images: [this.eventRegistrationModel.description_images],
      summary: [this.eventRegistrationModel.summary, Validators.required],
      allow_group_registration: [this.eventRegistrationModel.allow_group_registration],
      max_group_limit: [this.eventRegistrationModel.max_group_limit],
      status: [this.eventRegistrationModel.status],
      show_total_capacity: [this.eventRegistrationModel.show_total_capacity],
      show_remaining_seats: [this.eventRegistrationModel.show_remaining_seats],
      is_published: [this.eventRegistrationModel.is_published],
      show_start_time: [this.eventRegistrationModel.show_start_time],
      show_end_time: [this.eventRegistrationModel.show_end_time],
    });
  }

  editEventFormSubmit() {
    // if event is single day event, its end_date is same as start date
    if (this.eventCreationForm.get('is_single_day_event').value) {
      this.eventCreationForm.patchValue({'end_date': this.f['start_date'].value});

    }
    if (this.eventCreationForm.valid) {
      this.editEventButtonClicked = true;
      // here we need to update fk (number) for type,organizer and category of event
      this.eventCreationForm.patchValue({'type': this.f['type'].value.id});
      this.eventCreationForm.patchValue({'category': this.f['category'].value.id});
      this.eventCreationForm.patchValue({'organizer': this.f['organizer'].value.id});

      const formData = this.eventCreationForm.value;
      this.eventService.editEvent(formData, this.eventUuid).subscribe(response => {
        this.alertService.success(response['message']);
        this.router.navigateByUrl('/admin/events/list');
      }, error1 => {
        this.editEventButtonClicked = false;
      });
    } else {
      this.editEventButtonClicked = false;

      this.formValidationService.unMarkAllFormControls(this.eventCreationForm);

    }
  }

  onSubmitEventForm() {
    // if event is single day event, its end_date is same as start date
    if (this.eventCreationForm.get('is_single_day_event').value) {
      this.eventCreationForm.patchValue({'end_date': this.f['start_date'].value});

    }
    if (this.eventCreationForm.valid) {
      this.createEventButtonClicked = true;
      // here we need to update fk (number) for type,organizer and category of event
      this.eventCreationForm.patchValue({'type': this.f['type'].value.id});
      this.eventCreationForm.patchValue({'category': this.f['category'].value.id});
      this.eventCreationForm.patchValue({'organizer': this.f['organizer'].value.id});

      const formData = this.eventCreationForm.value;
      this.eventService.createEvent(formData).subscribe(response => {
        this.alertService.success(response['message']);
        this.router.navigateByUrl('/admin/events/list');
      }, error1 => {
        this.createEventButtonClicked = false;
      });
    } else {
      this.createEventButtonClicked = false;

      this.formValidationService.unMarkAllFormControls(this.eventCreationForm);

    }
  }

  selectEventTypeList(e) {
    // this.eventCreationForm.patchValue({'type': e.value.id});
  }

  selectEventCategory(e) {

    // this.eventCreationForm.patchValue({'category': e.value.id});

  }

  selectEventOrganizer(e) {
    // this.eventCreationForm.patchValue({'organizer': e.value.id});

  }

}
