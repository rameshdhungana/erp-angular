import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventAttendeeService} from '../../../../../core/services/dashboard/event-attendee.service';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {PageChangedEvent} from 'ngx-bootstrap';

@Component({
  selector: 'app-list-payment',
  templateUrl: './list-refund.component.html',
  styleUrls: ['./list-refund.component.css']
})
export class ListRefundComponent implements OnInit {

  constructor(private http: HttpClient,
              private eventAttendeeService: EventAttendeeService,
              private activatedRoute: ActivatedRoute) {
  }

  allRefundList = new BehaviorSubject([]);
  pagination = new BehaviorSubject({});
  eventUuid: string;
  queryParam = {};

  ngOnInit(): void {
    this.eventUuid = this.activatedRoute.snapshot.paramMap.get('eventUuid');

    this.getAllRefundList();
  }


  getAllRefundList(queryParam = {}) {
    this.eventAttendeeService.getAllRefundList(this.eventUuid, queryParam).subscribe(response => {
      this.allRefundList.next(response['data']['results']);
      this.pagination.next(response['data']['pagination']);
    });
  }

  filterAllAttendee() {
    this.getAllRefundList();
  }

  searchAttendee(e) {
    this.initializeAndUpdateQueryParam('search', e.target.value);
    this.getAllRefundList(this.queryParam);

  }

  updateQueryParam(key, value) {
    this.queryParam[key] = value;

  }

  initializeAndUpdateQueryParam(key, value) {
    this.queryParam = {};
    this.updateQueryParam(key, value);
  }

  pageChanged(event: PageChangedEvent): void {
    this.updateQueryParam('page', event.page);
    this.getAllRefundList(this.queryParam);

  }
}
