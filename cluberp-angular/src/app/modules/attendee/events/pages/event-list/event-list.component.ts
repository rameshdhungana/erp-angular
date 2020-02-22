import {Component, OnInit} from '@angular/core';
import {EventService} from '../../../../../core/services/dashboard/event.service';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {PageChangedEvent} from 'ngx-bootstrap';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  filteredEventList = new BehaviorSubject<Array<object>>([]);
  pagination = new BehaviorSubject({});
  todayDate: Date;
  searchForm: FormGroup;
  queryParam: {};

  constructor(
    private eventService: EventService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.resetQueryParam();
    this.buildForm();
    this.getEventList();
    this.testConsoleRoute();


    this.todayDate = new Date();

  }

  buildForm() {
    this.searchForm = this.formBuilder.group({
      'search_date': [''],
      'search_text': ['']
    });
  }

  getEventList() {
    this.queryParam['is_published'] = true;
    this.queryParam['status'] = 'Open';
    this.eventService.getEventList(this.queryParam).subscribe(response => {
      this.filteredEventList.next(response['data']['results']);
      this.pagination.next(response['data']['results']);

    });
  }

  resetQueryParam() {
    this.queryParam = {'is_published': true, 'status': 'Open'};

  }

  testConsoleRoute() {
    for (let i = 0; i < this.router.config.length; i++) {
      const route = this.router.config[i];
      // console.log(parent + '/' + route.path);
      if (route.children) {
        const currentPath = route.path ? parent + '/' + route.path : parent;
      }
    }
  }

  searchFilterEvents() {
    this.resetQueryParam();
    const search_text = this.searchForm.get('search_text').value;
    const search_date = this.searchForm.get('search_date').value;
    if (search_text || search_date) {

      if (search_text) {
        this.queryParam['search'] = search_text;

      }
      if (search_date) {
        this.queryParam['start_date__date__gte'] = this.searchForm.get('search_date').value;

      }

    }
    this.getEventList();


  }

  pageChanged(event: PageChangedEvent): void {
    this.queryParam['page'] = event.page;
    this.getEventList();

  }

}

