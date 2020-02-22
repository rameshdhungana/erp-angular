import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PageChangedEvent} from 'ngx-bootstrap';
import {EventItemService} from '../../../../../core/services/dashboard/event-item.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list-transportation-items',
  templateUrl: './list-transportation-items.component.html',
  styleUrls: ['./list-transportation-items.component.css']
})
export class ListTransportationItemsComponent implements OnInit {

  eventItemList = new BehaviorSubject([]);
  pagination = new BehaviorSubject({});
  queryParam = {};
  selectedFilter: string;
  eventUuid: string;


  constructor(
    private eventItemService: EventItemService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.eventUuid = this.activatedRoute.snapshot.paramMap.get('eventUuid');


    this.getEvenItemList();

  }

  getEvenItemList() {
    this.queryParam['group__name'] = 'Transportation';
    this.eventItemService.getEventItemList(this.eventUuid, this.queryParam).subscribe(response => {
      this.eventItemList.next(response['data']['results']);
      this.pagination.next(response['data']['pagination']);


    });
  }

  filterEventItemList(queryParam, searchFiterName) {
    if (queryParam) {
      this.queryParam = queryParam;
      this.getEvenItemList();
    }
    this.updateSelectedFilter(searchFiterName);

  }

  updateSelectedFilter(value) {
    this.selectedFilter = value;
  }

  searchEventItem(e) {
    this.initializeAndUpdateQueryParam('search', e.target.value);
    this.getEvenItemList();

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
    this.getEvenItemList();

  }

}
