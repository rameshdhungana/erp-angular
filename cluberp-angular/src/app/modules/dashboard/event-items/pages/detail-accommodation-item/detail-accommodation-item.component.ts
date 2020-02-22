import {Component, ElementRef, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventItemService} from '../../../../../core/services/dashboard/event-item.service';
import {ModalService} from '../../../../../core/services/common/modal.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../../../../shared/services/alert.service';
import {FormSubmitValidationService} from '../../../../../shared/services/form-submit-validation.service';
import {ExcelService} from '../../../../../core/services/common/excel.service';
import {ErrorService} from '../../../../../shared/services/error.service';

@Component({
  selector: 'app-detail-accommodation-item',
  templateUrl: './detail-accommodation-item.component.html',
  styleUrls: ['./detail-accommodation-item.component.css']
})
export class DetailAccommodationItemComponent implements OnInit {

  eventUuid: string;
  eventItemUuid: string;
  eventItemDetail: any;
  createRoomButtonClicked = false;
  editRoomNumberButtonClicked = false;
  allocateRoomButtonClicked = false;
  attendeeListForRoomAllocation = [];
  removeAllocatedAttendeeButtonClicked = false;
  deleteAccommodationRoomButtonClicked = false;
  roomCreationForm: FormGroup;
  roomAllocationForm: FormGroup;
  uploadExcelSheetForm: FormGroup;
  roomCreationExcelSheetForm: FormGroup;

  // room allocation result
  roomAllocationSuccessful = false;
  roomAllocationSuccessExcelData = [];
  totalProcessing: number;
  totalSuccess: number;
  totalFailure: number;

  // room creation excel related variables
  roomCreationSuccessful = false;
  roomCreationSuccessExcelData = [];
  totalRoomCreationProcessing: number;
  totalRoomCreationSuccess: number;
  totalRoomCreationFailure: number;


  loading = false;


  config = {
    displayKey: 'displayKey',
    search: true,
    height: 'auto',
    placeholder: 'Select',
    customComparator: () => {
    },
    // limitTo: options.length,
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Search',
    searchOnKey: 'searchKey'
  };


  @ViewChild('fileInput') fileInput: ElementRef;


  constructor(
    private activatedRoute: ActivatedRoute,
    private eventItemService: EventItemService,
    public modalService: ModalService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private formValidationService: FormSubmitValidationService,
    private excelService: ExcelService,
  ) {
  }

  ngOnInit() {
    this.eventUuid = this.activatedRoute.snapshot.paramMap.get('eventUuid');
    this.eventItemUuid = this.activatedRoute.snapshot.paramMap.get('eventItemUuid');
    this.getEventItemDetail();
    this.buildRoomCreationForm();
    this.buildRoomAllocationForm();
    this.getAttendeeListForRoomAllocation();
    this.buildUploadExcelSheetForm();
    this.buildRoomCreationExcelSheetForm();

  }


  getEventItemDetail() {
    this.eventItemService.getEventItemDetail(this.eventUuid, this.eventItemUuid).subscribe(response => {
      this.eventItemDetail = response['data'];
    });
  }

  createRoom() {
    if (this.roomCreationForm.valid) {
      this.createRoomButtonClicked = true;


      this.roomCreationForm.patchValue({'event_item_uuid': this.eventItemUuid});
      this.eventItemService.createRoom(this.eventUuid, this.roomCreationForm.value).subscribe(response => {
        this.modalService.closeModal();
        this.createRoomButtonClicked = false;
        //   now we append the accommodation_rooms of eventItemDetail to response data
        this.eventItemDetail.accommodation_rooms.push(response['data']);
        this.roomCreationForm.reset();
      }, error => {
        this.alertService.error('Room with this number already exits for this type.');
        this.createRoomButtonClicked = false;

      });
    } else {
      this.formValidationService.unMarkAllFormControls(this.roomCreationForm);
    }
  }

  editRoomNumber(room, index) {
    if (this.roomCreationForm.valid) {

      this.editRoomNumberButtonClicked = true;


      this.eventItemService.editAccommodationRoom(this.eventUuid, room.uuid, this.roomCreationForm.value).subscribe(response => {
        this.modalService.closeModal();
        this.editRoomNumberButtonClicked = false;
        //   now we need to replace the previous roomItem object with new updated response data
        this.eventItemDetail.accommodation_rooms[index] = response['data'];
        this.roomCreationForm.reset();

      }, error1 => {
        this.alertService.error(error1);
        this.editRoomNumberButtonClicked = false;

      });
    } else {
      this.formValidationService.unMarkAllFormControls(this.roomCreationForm);
    }
  }

  buildRoomCreationForm() {
    this.roomCreationForm = this.formBuilder.group(
      {
        'room_number': ['', Validators.required],
        'event_item_uuid': [''],
        'event_attendee': [null]
      });
  }


  patchAccommodationRoom(room, index) {
    this.eventItemService.editAccommodationRoom(this.eventUuid, room.uuid, this.roomAllocationForm.value).subscribe(response => {
      this.modalService.closeModal();
      this.allocateRoomButtonClicked = false;
      //   now we need to replace the previous roomItem object with new updated response data
      this.eventItemDetail.accommodation_rooms[index] = response['data'];
      this.roomAllocationForm.reset();

      // now we need to remove the allocated room
      const inx = this.attendeeListForRoomAllocation.findIndex(item => item.id === response['data']['event_attendee']['id']);
      this.attendeeListForRoomAllocation.splice(inx, 1);

    }, error1 => {
      this.alertService.error(error1);
      this.allocateRoomButtonClicked = false;

    });
  }

  allocateRoomToAttendee(room, index) {
    if (this.roomAllocationForm.valid) {
      this.allocateRoomButtonClicked = true;

      this.patchAccommodationRoom(room, index);


    } else {
      this.formValidationService.unMarkAllFormControls(this.roomAllocationForm);
    }
  }

  buildRoomAllocationForm() {
    this.roomAllocationForm = this.formBuilder.group(
      {
        'event_attendee': ['', Validators.required],
      });
  }

  selectionChanged(event) {
    this.roomAllocationForm.patchValue({'event_attendee': event.value.id});
  }

  getSearchPatternData(attendee) {
    return {
      'id': attendee.id, 'displayKey': attendee.user.first_name + ' ' + attendee.user.last_name + ' (' +
        attendee.confirmation_code + ' ,' + attendee.user.email + ' ,' + attendee.user.phone_number + ' )',
      'searchKey': attendee.user.first_name + ' ' + attendee.user.last_name + ' ' +
        attendee.confirmation_code + ' ' + attendee.user.email + ' ' + attendee.user.phone_number
    };
  }


  getAttendeeListForRoomAllocation() {
    this.eventItemService.getAttendeeListForRoomAllocation(this.eventUuid, this.eventItemUuid).subscribe(response => {
      for (const attendee of response['data']) {
        const data = this.getSearchPatternData(attendee);
        this.attendeeListForRoomAllocation.push(data);

      }
    });
  }

  removeAllocatedAttendee(room, index) {
    this.removeAllocatedAttendeeButtonClicked = true;
    this.eventItemService.editAccommodationRoom(this.eventUuid, room.uuid, {
      'event_attendee': null,
    }).subscribe(response => {
      this.modalService.closeModal();
      this.removeAllocatedAttendeeButtonClicked = false;
      //   now we need to replace the previous roomItem object with new updated response data
      this.eventItemDetail.accommodation_rooms[index] = response['data'];

      //   now we need to update the data for selection
      this.attendeeListForRoomAllocation.push(this.getSearchPatternData(room['event_attendee']));

    }, error1 => {
      this.alertService.error(error1);
      this.removeAllocatedAttendeeButtonClicked = false;

    });

  }

  deleteAccommodationRoom(room, index) {
    this.deleteAccommodationRoomButtonClicked = true;
    this.eventItemService.deleteAccommodationRoom(this.eventUuid, room.uuid).subscribe(response => {
      this.eventItemDetail.accommodation_rooms.splice(index, 1);
      this.deleteAccommodationRoomButtonClicked = false;
      this.modalService.closeModal();

    }, error1 => {
      this.deleteAccommodationRoomButtonClicked = false;
    });
  }


//   excel file upload functions

  buildUploadExcelSheetForm() {
    this.uploadExcelSheetForm = this.formBuilder.group(
      {
        'excel_sheet': ['', Validators.required],
      });
  }

  buildRoomCreationExcelSheetForm() {
    this.roomCreationExcelSheetForm = this.formBuilder.group(
      {
        'excel_sheet': ['', Validators.required],
      });
  }


  onFileChange(event, form) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      form.get('excel_sheet').setValue(file);
    }
  }

  private prepareSave(form): any {
    const input = new FormData();
    input.append('excel_sheet', form.get('excel_sheet').value);
    return input;
  }

  uploadExcelSheet() {
    const formData = this.prepareSave(this.uploadExcelSheetForm);
    if (this.uploadExcelSheetForm.valid) {
      this.loading = true;

      //   now we need to call backend API with formData as postData
      this.eventItemService.uploadRoomAllocationExcelSheet(this.eventUuid, this.eventItemUuid, formData).subscribe(response => {
          this.roomAllocationSuccessful = true;
          this.roomAllocationSuccessExcelData = response['data']['excel_data'];
          this.totalProcessing = response['data']['total_processing'];
          this.totalFailure = response['data']['total_failure'];
          this.totalSuccess = response['data']['total_success'];
          this.clearFile(this.uploadExcelSheetForm, 'room_allocation');
          this.getEventItemDetail();
          this.loading = false;
        },
        error1 => {
          this.loading = false;
          this.roomAllocationSuccessful = false;
          this.alertService.error('Something went wrong.You might have uploaded wrong excel sheet.');

        });
    }


  }

  clearFile(form, type) {
    form.reset();
    if (type === 'room_creation') {
      const fileInputReference = <HTMLInputElement>(document.getElementById('room-creation-excel-file'));
      fileInputReference.value = '';

    }
    if (type === 'room_allocation') {
      this.fileInput.nativeElement.value = '';


    }
  }

  downLoadEmptyExcelSheetForRoomAllocation() {
    this.eventItemService.downLoadEmptyExcelSheetForRoomAllocation(this.eventUuid, this.eventItemUuid).subscribe(response => {
        this.exportAsXLSX(response['data'], this.eventItemDetail.item_master.name + 'room_allocation_empty_sheet');
      },
      error1 => {
        this.alertService.error('Something went wrong.');
      });
  }


  downloadRoomAllocationExcelUploadResult(data) {
    this.exportAsXLSX(data, this.eventItemDetail.item_master_name + 'room_allocation_result');
    this.getEventItemDetail();

  }

  exportAsXLSX(data, fileName): void {
    this.excelService.exportAsExcelFile(data, fileName);

  }

  uploadRoomCreationExcelSheet() {
    const formData = this.prepareSave(this.roomCreationExcelSheetForm);
    if (this.roomCreationExcelSheetForm.valid) {
      this.loading = true;

      //   now we need to call backend API with formData as postData
      this.eventItemService.uploadRoomCreationExcelSheet(this.eventUuid, this.eventItemUuid, formData).subscribe(response => {
          this.roomCreationSuccessful = true;
          this.roomCreationSuccessExcelData = response['data']['excel_data'];
          this.totalRoomCreationProcessing = response['data']['total_processing'];
          this.totalRoomCreationFailure = response['data']['total_failure'];
          this.totalRoomCreationSuccess = response['data']['total_success'];
          this.loading = false;
          this.getEventItemDetail();
          this.clearFile(this.roomCreationExcelSheetForm, 'room_creation');
          this.modalService.closeModal();
        },
        error1 => {
          this.loading = false;
          this.roomCreationSuccessful = false;
          this.alertService.error('Something went wrong.You might have uploaded wrong excel sheet.');

        });
    }
  }
}
