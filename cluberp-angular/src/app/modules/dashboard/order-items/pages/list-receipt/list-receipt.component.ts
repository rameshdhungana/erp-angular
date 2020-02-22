import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventAttendeeService} from '../../../../../core/services/dashboard/event-attendee.service';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {PageChangedEvent} from 'ngx-bootstrap';

@Component({
  selector: 'app-list-receipt',
  templateUrl: './list-receipt.component.html',
  styleUrls: ['./list-receipt.component.css']
})
export class ListReceiptComponent implements OnInit {


  constructor(private http: HttpClient,
              private eventAttendeeService: EventAttendeeService,
              private activatedRoute: ActivatedRoute) {
  }

  allReceiptList = new BehaviorSubject([]);
  pagination = new BehaviorSubject({});
  eventUuid: string;
  queryParam = {};

  ngOnInit(): void {
    this.eventUuid = this.activatedRoute.snapshot.paramMap.get('eventUuid');

    this.getAllReceiptList();
  }


  getAllReceiptList(queryParam = {}) {
    this.eventAttendeeService.getAllReceiptList(this.eventUuid, queryParam).subscribe(response => {
      this.allReceiptList.next(response['data']['results']);
      this.pagination.next(response['data']['pagination']);
    });
  }

  filterAllAttendee() {
    this.getAllReceiptList();
  }

  searchAttendee(e) {
    this.initializeAndUpdateQueryParam('search', e.target.value);
    this.getAllReceiptList(this.queryParam);

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
    this.getAllReceiptList(this.queryParam);

  }
}
