import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AttendeeEventRegistrationService} from '../../../../../core/services/attendee/attendee-event-registration.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../../../shared/services/alert.service';
import {BillingService} from '../../../../../core/services/attendee/billing.service';

@Component({
  selector: 'app-view-order-summary',
  templateUrl: './view-order-summary.component.html',
  styleUrls: ['./view-order-summary.component.css']
})
export class ViewOrderSummaryComponent implements OnInit {

  eventUuid: string;
  attendeeUuid: string;

  numberOfAttendees: number;
  mainAttendeeOrderedItemList = [];
  paymentItemList = [];
  refundItemList = [];
  serviceChargeAndTaxItemList = [];
  couponItemList = [];
  guestAttendeeOrderedItemList = [];
  confirmationCodeList = [];

  orderDetail: any;
  netBalance: number;
  isMainAttendee: boolean;
  orderIsCancelled = false;

  // loading variable
  loading = true;
  redeemOrPayBalanceButtonClicked = false;

  constructor(
    private attendeeEventService: AttendeeEventRegistrationService,
    private activatedRoute: ActivatedRoute,
    private  router: Router,
    private registrationService: AttendeeEventRegistrationService,
    private alertService: AlertService,
    private billingService: BillingService,
  ) {
  }

  ngOnInit() {
    this.eventUuid = this.activatedRoute.snapshot.paramMap.get('eventUuid');
    this.attendeeUuid = this.activatedRoute.snapshot.paramMap.get('attendeeUuid');
    this.getOrderItemList();


  }

  getOrderItemList() {
    this.registrationService.getEventAttendeeOrderSummary(this.eventUuid, this.attendeeUuid).subscribe(response => {
      console.log('order reponse', response);
      this.guestAttendeeOrderedItemList = response['data']['guest_attendees_order_items'];
      this.mainAttendeeOrderedItemList = response['data']['main_attendee_order_items'];
      this.paymentItemList = response['data']['payment_items'];
      this.refundItemList = response['data']['refund_items'];
      this.couponItemList = response['data']['coupon_items'];
      this.serviceChargeAndTaxItemList = response['data']['service_charge_and_tax_items'];
      this.confirmationCodeList = response['data']['confirmation_codes'];
      this.orderDetail = response['data']['order'];
      this.netBalance = response['data']['net_balance'];
      this.isMainAttendee = response['data']['is_main_attendee'];
      this.orderIsCancelled = response['data']['order_is_cancelled'];

      //  since loading is completed now we make the loading false
      this.loading = false;

    });
  }

  generateTotalAmount(orderItemList) {
    let totalAmount = 0;
    for (const item of orderItemList) {
      totalAmount += Number(item.amount_net);
    }
    return totalAmount.toFixed(2);
  }

  generateCouponTotal(couponItemList) {
    let totalAmount = 0;
    for (const item of couponItemList) {
      totalAmount += Number(item.coupon.amount_used);
    }
    return totalAmount.toFixed(2);
  }



  finishOrderSummary() {
    this.router.navigateByUrl(`/events/detail/${this.eventUuid}`);
  }

  BackToEditOrder() {
    this.router.navigateByUrl(`/events/order/edit/${this.eventUuid}/${this.attendeeUuid}`);
  }

  redeemBalance() {
    this.redeemOrPayBalanceButtonClicked = true;
    const postData = {'event_uuid': this.eventUuid, 'main_attendee_uuid': this.attendeeUuid};
    this.billingService.redeemBalance(postData).subscribe(response => {
      console.log(response);
      this.loading = true;
      this.getOrderItemList();
      this.redeemOrPayBalanceButtonClicked = false;
      this.alertService.success(response['message']);
    }, error1 => {
      this.redeemOrPayBalanceButtonClicked = false;
    });
  }

  openPaymentCheckout() {
    console.log('stripe checkout form enabled');
    const handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
      locale: 'auto',

      token: function (token: any) {
        // You can access the token ID with `token.id`.
        console.log(token.id, token.email);

        const postData = {'event_uuid': this.eventUuid, 'main_attendee_uuid': this.attendeeUuid, 'token': token};

        // Get the token ID to your server-side code for use.
        this.billingService.payBalance(postData).subscribe(response => {
          this.loading = true;
          this.getOrderItemList();


        });
        console.log(token, token);

      }.bind(this)
    });

    handler.open({
        name: 'Amaaroo',
        description: 'Card Details',
        zipCode: true,
        billingAddress: true,
        panelLabel: 'Submit',
        allowRememberMe: false,
        // amount: this.grandTotalAmount,
        amount: this.netBalance * Number(100),
        closed: () => {
        }
      }
    );
  }

  payBalance() {
    const postData = {'event_uuid': this.eventUuid, 'main_attendee_uuid': this.attendeeUuid};
    this.billingService.payBalance(postData).subscribe(response => {
      console.log(response);
      this.loading = true;
      this.getOrderItemList();

    });
  }


}
