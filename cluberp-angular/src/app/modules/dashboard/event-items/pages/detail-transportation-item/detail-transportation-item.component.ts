import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventItemService} from '../../../../../core/services/dashboard/event-item.service';
import {ModalService} from '../../../../../core/services/common/modal.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../../../../shared/services/alert.service';
import {FormSubmitValidationService} from '../../../../../shared/services/form-submit-validation.service';
import {ExcelService} from '../../../../../core/services/common/excel.service';
import {TransportationPickupLocationService} from '../../../../../core/services/dashboard/transportation-pickup-location.service';

@Component({
  selector: 'app-detail-transportation-item',
  templateUrl: './detail-transportation-item.component.html',
  styleUrls: ['./detail-transportation-item.component.css']
})
export class DetailTransportationItemComponent implements OnInit {

  eventUuid: string;
  eventItemUuid: string;
  eventItemDetail: any;
  loading = false;
  pickUpLocationForm: FormGroup;
  createPickUpLocationButtonClicked = false;
  editPickUpLocationButtonClicked = false;
  deletePickUpLocationButtonClicked = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventItemService: EventItemService,
    private pickUpLocationService: TransportationPickupLocationService,
    public modalService: ModalService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private formValidationService: FormSubmitValidationService,
  ) {
  }

  ngOnInit() {
    this.eventUuid = this.activatedRoute.snapshot.paramMap.get('eventUuid');
    this.eventItemUuid = this.activatedRoute.snapshot.paramMap.get('eventItemUuid');
    this.getEventItemDetail();
    this.buildPickUpLocationForm();
  }

  getEventItemDetail() {
    this.eventItemService.getEventItemDetail(this.eventUuid, this.eventItemUuid).subscribe(response => {
      this.eventItemDetail = response['data'];
    });
  }

  createPickupLocation() {
    if (this.pickUpLocationForm.valid) {
      this.createPickUpLocationButtonClicked = true;


      this.pickUpLocationForm.patchValue({'event_item_uuid': this.eventItemUuid});
      this.pickUpLocationService.createPickUpLocation(this.eventUuid, this.pickUpLocationForm.value).subscribe(response => {
        this.modalService.closeModal();
        this.createPickUpLocationButtonClicked = false;
        //   now we append the transportation_pickup_locations of eventItemDetail to response data
        this.eventItemDetail.transportation_pickup_locations.push(response['data']);
        this.pickUpLocationForm.reset();
      }, error => {
        this.alertService.error(error);
        this.createPickUpLocationButtonClicked = false;

      });
    } else {
      this.formValidationService.unMarkAllFormControls(this.pickUpLocationForm);
    }
  }

  editPickUpLocation(pickUpLocation, index) {
    if (this.pickUpLocationForm.valid) {

      this.editPickUpLocationButtonClicked = true;
      this.pickUpLocationService.editPickUpLocation(this.eventUuid, pickUpLocation.uuid, this.pickUpLocationForm.value).subscribe(
        response => {
          this.modalService.closeModal();
          this.editPickUpLocationButtonClicked = false;
          //   now we need to replace the previous roomItem object with new updated response data
          this.eventItemDetail.transportation_pickup_locations[index] = response['data'];
          this.pickUpLocationForm.reset();

        }, error1 => {
          this.alertService.error(error1);
          this.editPickUpLocationButtonClicked = false;

        });
    } else {
      this.formValidationService.unMarkAllFormControls(this.pickUpLocationForm);
    }
  }

  deletePickUpLocation(pickUpLocation, index) {
    this.deletePickUpLocationButtonClicked = true;
    this.pickUpLocationService.deletePickUpLocation(this.eventUuid, pickUpLocation.uuid).subscribe(response => {
      this.eventItemDetail.transportation_pickup_locations.splice(index, 1);
      this.deletePickUpLocationButtonClicked = false;
      this.modalService.closeModal();

    }, error1 => {
      this.deletePickUpLocationButtonClicked = false;
    });
  }

  buildPickUpLocationForm() {
    this.pickUpLocationForm = this.formBuilder.group(
      {
        'location': ['', Validators.required],
        'event_item_uuid': [''],
      });
  }
}
