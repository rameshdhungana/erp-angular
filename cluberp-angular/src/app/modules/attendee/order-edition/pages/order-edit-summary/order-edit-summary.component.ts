import {Component, OnInit} from '@angular/core';
import {AttendeeEventRegistrationService} from '../../../../../core/services/attendee/attendee-event-registration.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../../../shared/services/alert.service';
import {AttendeeOrderEditService} from '../../../../../core/services/attendee/attendee-order-edit.service';
import {BillingService} from '../../../../../core/services/attendee/billing.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormSubmitValidationService} from '../../../../../shared/services/form-submit-validation.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {OrderLoginConfirmationCodeService} from '../../../../../shared/services/order-login-confirmation-code.service';

@Component({
  selector: 'app-order-edit-summary',
  templateUrl: './order-edit-summary.component.html',
  styleUrls: ['./order-edit-summary.component.css']
})
export class OrderEditSummaryComponent implements OnInit {


  eventUuid: string;
  attendeeUuid: string;

  numberOfAttendees: number;
  isMainAttendee = new BehaviorSubject(false);
  registrationIsCancelled = new BehaviorSubject(false);
  changedToOffSite = new BehaviorSubject(false);
  // itemsList related variables
  mainAttendeeOrderedItemList = new BehaviorSubject([]);
  paymentItemList = new BehaviorSubject([]);
  couponItemList = new BehaviorSubject([]);
  guestAttendeeOrderedItemList = new BehaviorSubject([]);
  confirmationCodeList = new BehaviorSubject([]);
  serviceChargeAndTaxItemList = new BehaviorSubject([]);
  cancellationChargeItemList = new BehaviorSubject([]);
  // amount related variables
  amountNetForChangedCart = new BehaviorSubject(0);
  netServiceChargeAndTaxAmount = new BehaviorSubject(0);
  netBalanceFromLatestOrder = new BehaviorSubject(0);
  currentTotalCreditAmountUsed = new BehaviorSubject(0);
  finalAmountToPay = new BehaviorSubject(0);
  refundableBalance = new BehaviorSubject(0);
  balanceCredit = new BehaviorSubject(0);
  currentTotalDiscountCouponUsed = new BehaviorSubject(0);

  orderDetail: any;

  // coupon related variables
  couponForm: FormGroup;
  applyCouponButtonClicked: boolean;
  removeCouponButtonClicked: boolean;

  // confirm button related variable
  confirmOrderEditButtonClicked = false;

  // loading variable
  loading = true;


  constructor(
    private attendeeEventService: AttendeeEventRegistrationService,
    private activatedRoute: ActivatedRoute,
    private  router: Router,
    private orderEditService: AttendeeOrderEditService,
    private alertService: AlertService,
    private billingService: BillingService,
    private formBuilder: FormBuilder,
    private formValidationService: FormSubmitValidationService,
    private orderConfirmationCodeService: OrderLoginConfirmationCodeService
  ) {
  }

  ngOnInit() {
    this.eventUuid = this.activatedRoute.snapshot.paramMap.get('eventUuid');
    this.attendeeUuid = this.activatedRoute.snapshot.paramMap.get('attendeeUuid');
    this.getOrderItemList();
    this.buildCouponForm();


  }

  buildCouponForm() {
    this.couponForm = this.formBuilder.group(
      {
        'coupon_code': ['', Validators.required]
      }
    );
  }

  getOrderItemList() {
    this.orderEditService.getEditedOrderAndCartSummary(this.eventUuid, this.attendeeUuid).subscribe(response => {
      this.isMainAttendee.next(response['data']['is_main_attendee']);
      this.registrationIsCancelled.next(response['data']['registration_is_cancelled']);
      this.changedToOffSite.next(response['data']['changed_to_offsite']);
      this.guestAttendeeOrderedItemList.next(response['data']['guest_attendees_order_items']);
      this.mainAttendeeOrderedItemList.next(response['data']['main_attendee_order_items']);
      this.paymentItemList.next(response['data']['payment_items']);
      this.couponItemList.next(response['data']['coupon_items']);
      this.confirmationCodeList.next(response['data']['confirmation_codes']);
      this.serviceChargeAndTaxItemList.next(response['data']['service_charge_and_tax_items']);
      this.cancellationChargeItemList.next(response['data']['cancellation_charge_cart_items']);

      // amount related variables
      this.amountNetForChangedCart.next(response['data']['amount_net_for_changed_cart_items']);
      this.netServiceChargeAndTaxAmount.next(response['data']['net_service_charge_and_tax_amount']);
      this.currentTotalCreditAmountUsed.next(response['data']['current_total_credit_amount_used']);
      this.netBalanceFromLatestOrder.next(response['data']['net_balance_from_latest_order']);
      this.finalAmountToPay.next(response['data']['final_amount_to_pay']);
      this.refundableBalance.next(response['data']['refundable_balance']);
      this.balanceCredit.next(response['data']['balance_credit']);
      this.currentTotalDiscountCouponUsed.next(response['data']['current_total_discount_coupon_used']);


      this.orderDetail = response['data']['order'];

      //  now we make the loading variable false
      this.loading = false;

    });
  }

  generateTotalNetAmount(orderItemList) {
    let totalAmount = 0;
    for (const item of orderItemList) {
      if (item.is_cart_item) {
        totalAmount += Number(item.amount_net);
      }
    }
    return totalAmount;
  }

  generateTaxAndServiceChargeTotalAmount(orderItemList) {
    let totalAmount = 0;
    for (const item of orderItemList) {

      totalAmount += Number(item.amount_net);
    }
    return totalAmount.toFixed(2);
  }

  generateCouponTotal(couponList) {
    let totalAmount = 0;
    for (const coupon_item of couponList) {
      totalAmount += Number(coupon_item['coupon']['amount_used']);
    }
    return totalAmount.toFixed(2);
  }

  calculateGrandTotalAmount() {
    let grandTotal = 0;
    const allItemList = [this.mainAttendeeOrderedItemList.value, this.paymentItemList.value];
    for (const itemList of allItemList) {
      grandTotal += Number(this.generateTotalNetAmount(itemList));
    }
    for (const eachGuestItemList of this.guestAttendeeOrderedItemList.value) {
      grandTotal += Number(this.generateTotalNetAmount(eachGuestItemList));

    }
    return grandTotal.toFixed(2);
  }


  openPaymentCheckout() {
    const handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
      locale: 'auto',

      token: function (token: any) {
        // You can access the token ID with `token.id`.

        this.loading = true;

        // Get the token ID to your server-side code for use.
        this.billingService.confirmOrderEdit(this.eventUuid, this.attendeeUuid, token).subscribe(response => {
            this.confirmOrderEditButtonClicked = true;
            this.redirectToViewOrderSummary();


          },
          error1 => {
            this.loading = false;
            this.alertService.error('Something went wrong on our side!');
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
        // amount: this.grandTotalAmount,
        amount: this.finalAmountToPay.value * Number(100),
        closed: () => {
        }
      }
    );
  }

  applyCouponCode() {
    if (this.couponForm.valid) {
      this.applyCouponButtonClicked = true;

      const postData = {
        'coupon_code': this.couponForm.get('coupon_code').value,
        'event_attendee_uuid': this.attendeeUuid,
        'event_uuid': this.eventUuid
      };
      this.attendeeEventService.validateAndApplyCouponCode(postData).subscribe(response => {
        this.couponForm.reset();
        if (response['code'] === 1) {
          this.loading = true;
          this.alertService.success(('Coupon Code is successfully applied'));
          this.getOrderItemList();
          this.applyCouponButtonClicked = false;


        } else {
          // if response code is 0 , we provide the information that coupon code is invalid
          this.alertService.error(response['message']);
          this.applyCouponButtonClicked = false;


        }
      }, error1 => {
        this.applyCouponButtonClicked = false;
        this.alertService.error('Something went wrong on our side!');
      });
    } else {
      this.formValidationService.unMarkAllFormControls(this.couponForm);
    }

  }

  removeCouponFromCart(cartItemUuid) {
    this.removeCouponButtonClicked = true;
    const postData = {
      'cart_item_uuid': cartItemUuid,

    };
    this.attendeeEventService.removeCouponFromCart(postData).subscribe(response => {
      this.removeCouponButtonClicked = false;
      if (response['code'] === 1) {
        this.loading = true;
        this.getOrderItemList();
        this.alertService.success(response['message']);


      } else {
        // if response code is 0 , we provide the information that coupon code is invalid
        this.alertService.error(response['message']);


      }
    }, error1 => {
      this.removeCouponButtonClicked = false;
    });
  }

  confirmOrderEditWithoutPayment() {
    this.confirmOrderEditButtonClicked = true;
    this.billingService.confirmOrderEdit(this.eventUuid, this.attendeeUuid, []).subscribe(response => {
      this.loading = true;
      this.redirectToViewOrderSummary();
    }, error1 => {
      this.loading = false;
      this.confirmOrderEditButtonClicked = false;
      this.alertService.error('Something went wrong on our side!');
    });
  }


  redirectToViewOrderSummary() {
    this.confirmOrderEditButtonClicked = false;


    this.router.navigateByUrl(`/events/order/summary/${this.eventUuid}/${this.attendeeUuid}`);

  }

  BackToEditOrder() {
    this.router.navigateByUrl(`/events/order/edit/${this.eventUuid}/${this.attendeeUuid}`);
  }
}
