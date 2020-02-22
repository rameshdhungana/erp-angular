import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventAttendeeService} from '../../../../../core/services/dashboard/event-attendee.service';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {PageChangedEvent} from 'ngx-bootstrap';

@Component({
  selector: 'app-list-creditor',
  templateUrl: './list-creditor.component.html',
  styleUrls: ['./list-creditor.component.css']
})
export class ListCreditorComponent implements OnInit {

  constructor(private http: HttpClient,
              private eventAttendeeService: EventAttendeeService,
              private activatedRoute: ActivatedRoute) {
  }

  allAttendeeList = new BehaviorSubject([]);
  pagination = new BehaviorSubject({});
  eventUuid: string;
  queryParam = {};

  ngOnInit(): void {
    this.eventUuid = this.activatedRoute.snapshot.paramMap.get('eventUuid');

    this.getAllCreditorAttendeeList();
  }


  getAllCreditorAttendeeList(queryParam = {}) {
    this.eventAttendeeService.getAllCreditorAttendeeList(this.eventUuid, queryParam).subscribe(response => {
      this.allAttendeeList.next(response['data']['results']);
      this.pagination.next(response['data']['pagination']);
    });
  }

  filterAllAttendee() {
    this.getAllCreditorAttendeeList();
  }

  searchAttendee(e) {
    this.initializeAndUpdateQueryParam('search', e.target.value);
    this.getAllCreditorAttendeeList(this.queryParam);

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
    this.getAllCreditorAttendeeList(this.queryParam);

  }
}
