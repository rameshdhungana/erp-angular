import {Component, OnInit} from '@angular/core';
import {EventService} from '../../../../../core/services/dashboard/event.service';
import {BehaviorSubject} from 'rxjs';
import {PageChangedEvent} from 'ngx-bootstrap';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})
export class ListEventComponent implements OnInit {
  eventList = new BehaviorSubject([]);
  pagination = new BehaviorSubject({});
  finalQueryParam = {};
  selectedFilter: string;


  constructor(
    private eventService: EventService
  ) {
  }

  ngOnInit() {
    this.getEventList();

  }

  getEventList() {
    this.eventService.getEventList(this.finalQueryParam).subscribe(response => {
      this.eventList.next(response['data']['results']);
      this.pagination.next(response['data']['pagination']);


    });
  }

  filterEventList(queryParam, searchFiterName) {
    if (queryParam) {
      this.finalQueryParam = queryParam;

    } else {
      this.finalQueryParam = {};
    }
    this.updateSelectedFilter(searchFiterName);

    this.getEventList();


  }

  deleteKeyFromFinalQueryParam(key) {
    delete this.finalQueryParam[key];

  }

  updateSelectedFilter(value) {
    this.selectedFilter = value;
  }

  searchEvent(e) {
    this.initializeAndUpdateQueryParam('search', e.target.value);
    this.getEventList();

  }

  updateQueryParam(key, value) {
    this.finalQueryParam[key] = value;

  }

  initializeAndUpdateQueryParam(key, value) {
    this.finalQueryParam = {};
    this.updateQueryParam(key, value);
  }

  pageChanged(event: PageChangedEvent): void {
    this.updateQueryParam('page', event.page);
    this.getEventList();

  }

}
