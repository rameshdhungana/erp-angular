import {Component, OnInit} from '@angular/core';
import {AttendeeEventRegistrationService} from '../../../../../core/services/attendee/attendee-event-registration.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../../../shared/services/alert.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormSubmitValidationService} from '../../../../../shared/services/form-submit-validation.service';
import {BillingService} from '../../../../../core/services/attendee/billing.service';
import {OrderLoginConfirmationCodeService} from '../../../../../shared/services/order-login-confirmation-code.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-view-cart-summary',
  templateUrl: './view-cart-summary.component.html',
  styleUrls: ['./view-cart-summary.component.css']
})
export class ViewCartSummaryComponent implements OnInit {
  eventUuid: string;
  attendeeUuid: string;
  registrationCartItemList = new BehaviorSubject([]);
  accommodationCartItemList = new BehaviorSubject([]);
  transportationCartItemList = new BehaviorSubject([]);
  serviceChargeAndTaxItemList = new BehaviorSubject([]);
  couponCartItemList = new BehaviorSubject([]);
  numberOfAttendees = new BehaviorSubject(0);
  groupType = new BehaviorSubject('');
  registrationChangedToOnSite = new BehaviorSubject(false);

  // amount related variables
  amountNetForChangedCart = new BehaviorSubject(0);
  netServiceChargeAndTaxAmount = new BehaviorSubject(0);
  netBalanceFromLatestOrder = new BehaviorSubject(0);
  totalCreditAmountUsed = new BehaviorSubject(0);
  finalAmountToPay = new BehaviorSubject(0);
  refundableBalance = new BehaviorSubject(0);
  balanceCredit = new BehaviorSubject(0);

  couponForm: FormGroup;
  applyCouponButtonClicked: boolean;
  removeCouponButtonClicked: boolean;


  confirmOrderButtonClicked = false;
  // loading variable
  loading = true;


  constructor(
    private attendeeEventService: AttendeeEventRegistrationService,
    private activatedRoute: ActivatedRoute,
    private  router: Router,
    private registrationService: AttendeeEventRegistrationService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private formValidationService: FormSubmitValidationService,
    private billingService: BillingService,
    private orderConfirmationCodeService: OrderLoginConfirmationCodeService
  ) {
  }

  ngOnInit() {

    this.eventUuid = this.activatedRoute.snapshot.paramMap.get('eventUuid');
    this.attendeeUuid = this.activatedRoute.snapshot.paramMap.get('attendeeUuid');
    this.getEventCartItemList();
    this.buildCouponForm();


  }

  buildCouponForm() {
    this.couponForm = this.formBuilder.group(
      {
        'coupon_code': ['', Validators.required]
      }
    );
  }


  getEventCartItemList() {
    this.registrationService.getEventCartItemList(this.eventUuid, this.attendeeUuid).subscribe(response => {
      this.groupType.next(response['data']['group_type']);
      this.registrationChangedToOnSite.next(response['data']['changed_to_onsite']);
      this.registrationCartItemList.next(response['data']['registration_cart_items_data']);
      this.accommodationCartItemList.next(response['data']['accommodation_cart_items_data']);
      this.transportationCartItemList.next(response['data']['transportation_cart_items_data']);
      this.couponCartItemList.next(response['data']['coupon_cart_items_data']);
      this.serviceChargeAndTaxItemList.next(response['data']['service_charge_and_tax_items']);
      this.numberOfAttendees.next(response['data']['number_of_attendees']);

      // amount related variables
      this.amountNetForChangedCart.next(response['data']['amount_net_for_changed_cart_items']);
      this.netServiceChargeAndTaxAmount.next(response['data']['net_service_charge_and_tax_amount']);
      this.totalCreditAmountUsed.next(response['data']['total_credit_amount_used']);
      this.netBalanceFromLatestOrder.next(response['data']['net_balance_from_latest_order']);
      this.finalAmountToPay.next(response['data']['final_amount_to_pay']);
      this.refundableBalance.next(response['data']['refundable_balance']);
      this.balanceCredit.next(response['data']['balance_credit']);


      // finally after the cart data is available , we make loading false
      this.loading = false;
    });


  }

  generateTotalAmount(cartItemList) {
    let totalAmount = 0;
    for (const item of cartItemList) {
      totalAmount += Number(item.amount_net);
    }
    return totalAmount.toFixed(2);
  }

  calculateGrandTotalAmount() {
    let grandTotal = 0;
    const allCartItemList = [this.registrationCartItemList.value, this.accommodationCartItemList.value,
      this.transportationCartItemList.value, this.serviceChargeAndTaxItemList.value];
    for (const cartItemList of allCartItemList) {
      grandTotal += Number(this.generateTotalAmount(cartItemList));
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
        this.billingService.confirmOrder(this.eventUuid, this.attendeeUuid, token).subscribe(response => {
          this.redirectToViewOrderSummary();
        }, error1 => {
          this.loading = false;
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

  // confirmOrder() {
  //   this.billingService.confirmOrder(this.eventUuid, this.attendeeUuid, token).subscribe(response => {
  //   });
  // }

  confirmOrderWithoutPayment() {
    this.confirmOrderButtonClicked = true;
    this.billingService.confirmOrder(this.eventUuid, this.attendeeUuid, []).subscribe(response => {
        this.redirectToViewOrderSummary();

      },
      error1 => {
        this.confirmOrderButtonClicked = false;
      });
  }

  applyCouponCode() {
    if (this.couponForm.valid) {
      this.applyCouponButtonClicked = true;

      const postData = {
        'coupon_code': this.couponForm.get('coupon_code').value,
        'event_attendee_uuid': this.attendeeUuid,
        'event_uuid': this.eventUuid
      };
      this.registrationService.validateAndApplyCouponCode(postData).subscribe(response => {
        this.applyCouponButtonClicked = false;
        this.couponForm.reset();

        if (response['code'] === 1) {
          this.loading = true;
          this.getEventCartItemList();
          this.alertService.success(response['message']);


        } else {
          // if response code is 0 , we provide the information that coupon code is invalid
          this.alertService.error(response['message']);


        }
      }, error1 => {
        this.applyCouponButtonClicked = false;
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
    this.registrationService.removeCouponFromCart(postData).subscribe(response => {
      this.removeCouponButtonClicked = false;

      if (response['code'] === 1) {
        this.loading = true;
        this.getEventCartItemList();
        this.alertService.success(response['message']);


      } else {
        // if response code is 0 , we provide the information that coupon code is invalid
        this.alertService.error(response['message']);


      }
    }, error1 => {
      this.removeCouponButtonClicked = false;
    });
  }

  // calculateCouponAppliedAmount(coupon) {
  //
  //   return (Number(coupon.amount_limit) - Number(coupon.amount_used)) * Number(-1);
  // }

  backEditRedirect() {
    if (this.groupType.value === 'OnSite') {
      this.router.navigateByUrl(`/events/registration/transportation/${this.eventUuid}/${this.attendeeUuid}`);
    }
    if (this.groupType.value === 'OffSite') {
      if (this.registrationChangedToOnSite.value) {
        this.router.navigateByUrl(`/events/registration/transportation/${this.eventUuid}/${this.attendeeUuid}`);

      } else {
        this.router.navigateByUrl(`/events/registration/accommodation-type/${this.eventUuid}/${this.attendeeUuid}`);

      }
    }

  }


  redirectToViewOrderSummary() {
    this.orderConfirmationCodeService.removeOrderLoginConfirmationCode();
    this.router.navigateByUrl(`/events/order/summary/${this.eventUuid}/${this.attendeeUuid}`);

  }
}
