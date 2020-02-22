import {Component, OnInit} from '@angular/core';
import {EventService} from '../../../../../core/services/dashboard/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EventCommonService} from '../../../../../core/services/common/event-common.service';
import {EventItemService} from '../../../../../core/services/dashboard/event-item.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BillingService} from '../../../../../core/services/attendee/billing.service';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.css']
})
export class DetailEventComponent implements OnInit {
  eventUuid: string;
  eventDetail: any;
  eventItemGroupTypeList = [];
  paymentForm: FormGroup;

  constructor(
    private eventCommonService: EventCommonService,
    private activatedRoute: ActivatedRoute,
    private eventItemService: EventItemService,
    private router: Router,
    private formBuilder: FormBuilder,
    private billingService: BillingService
  ) {
  }

  ngOnInit() {
    this.eventUuid = this.activatedRoute.snapshot.paramMap.get('eventUuid');
    this.getEventDetail();
    this.getEventItemGroupTypeList();
    this.buildPaymentForm();

  }

  getEventItemGroupTypeList() {
    this.eventItemService.getEventItemGroupTypeList(this.eventUuid, {'no_page': true}).subscribe(response => {
      this.eventItemGroupTypeList = response['data'];

    });

  }

  getEventDetail() {
    this.eventCommonService.getEventDetail(this.eventUuid).subscribe(response => {
      this.eventDetail = response['data'];
    });
  }

  redirectToEventItemListComponent(eventItemGroupTypeName) {
    if (eventItemGroupTypeName === 'Accommodation') {
      this.router.navigateByUrl(`/admin/events/${this.eventUuid}/accommodation-items`);

    }
    if (eventItemGroupTypeName === 'Transportation') {
      this.router.navigateByUrl(`/admin/events/${this.eventUuid}/transportation-items`);

    }
    if (eventItemGroupTypeName === 'Registration') {
      this.router.navigateByUrl(`/admin/events/${this.eventUuid}/registration-items`);

    }

  }

//   payment related functions
  buildPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      'EPS_MERCHANT': [''],
      'EPS_TXNTYPE': [''],
      'EPS_REFERENCEID': [''],
      'EPS_AMOUNT': [''],
      'EPS_TIMESTAMP': [''],
      'EPS_FINGERPRINT': [''],
      'EPS_RESULTURL': [''],
      'EPS_CARDNUMBER': [''],
      'EPS_EXPIRYMONTH': [''],
      'EPS_EXPIRYYEAR': [''],
      'EPS_CCV': [''],
    });
    this.paymentForm.patchValue({
      'EPS_MERCHANT': 'ABC0001',
      'EPS_TXNTYPE': '0',
      'EPS_REFERENCEID': 'test-reference',
      'EPS_AMOUNT': '400',
      'EPS_TIMESTAMP': '20190612114540',
      'EPS_FINGERPRINT': this.get_ssh256_hash_key(),
      'EPS_RESULTURL': 'http://events.nipunaprabidhiksewa.net/',
      'EPS_CARDNUMBER': '4444333322221111',
      'EPS_EXPIRYMONTH': '12',
      'EPS_EXPIRYYEAR': '2020',
      'EPS_CCV': '123',
    });

  }

  get_ssh256_hash_key() {
    return 'SHA256hash';
  }

  clickPaymentForm() {
    if (this.paymentForm.valid) {
      localStorage.setItem('HTTP_INTERCEPTION_IS_DISABLED', 'true');
      this.billingService.securePayTest(this.paymentForm.value).subscribe(response => {
        localStorage.removeItem('HTTP_INTERCEPTION_IS_DISABLED');

      }, error1 => {
        localStorage.removeItem('HTTP_INTERCEPTION_IS_DISABLED');

      });
    }

  }


}
