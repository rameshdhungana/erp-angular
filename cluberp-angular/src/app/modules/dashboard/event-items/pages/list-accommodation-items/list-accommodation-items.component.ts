import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PageChangedEvent} from 'ngx-bootstrap';
import {EventItemService} from '../../../../../core/services/dashboard/event-item.service';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../../../../core/services/dashboard/event.service';

@Component({
  selector: 'app-list-accommodation-items',
  templateUrl: './list-accommodation-items.component.html',
  styleUrls: ['./list-accommodation-items.component.css']
})
export class ListAccommodationItemsComponent implements OnInit {

  eventItemList = new BehaviorSubject([]);
  pagination = new BehaviorSubject({});
  queryParam = {};
  selectedFilter: string;
  eventUuid: string;
  availableAccommodationSharingList = [];

  constructor(
    private eventItemService: EventItemService,
    private activatedRoute: ActivatedRoute,
    private eventService: EventService
  ) {
  }

  ngOnInit() {
    this.eventUuid = this.activatedRoute.snapshot.paramMap.get('eventUuid');
    this.getEvenItemList();
    this.getAvailableAccommodationSharingList();

  }

  getEvenItemList() {
    this.queryParam['group__name'] = 'Accommodation';

    this.eventItemService.getEventItemList(this.eventUuid, this.queryParam).subscribe(response => {
      this.eventItemList.next(response['data']['results']);
      this.pagination.next(response['data']['pagination']);
      this.generateRoomCreationAndAllocationStatus(this.eventItemList.value);


    });
  }

  getAvailableAccommodationSharingList() {
    this.eventService.getAccommodationSharingCountList(this.eventUuid).subscribe(response => {

      this.availableAccommodationSharingList = response['data'];

    });
  }

  filterEventItemList(key, value, searchFilterName) {
    if (key) {
      this.queryParam[key] = value;
      this.getEvenItemList();
    }
    this.updateSelectedFilter(searchFilterName);

  }

  updateSelectedFilter(value) {
    this.selectedFilter = value;
  }

  searchEvent(e) {
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

  generateRoomCreationAndAllocationStatus(eventItemList) {
    const that = this;
    eventItemList.forEach(function (eventItem, index) {
      that.getRoomCreationStatus(eventItemList, eventItem, index);
      that.getRoomAllocationStatus(eventItemList, eventItem, index);

    });

    this.eventItemList.next(eventItemList);

  }

  getRoomCreationStatus(eventItemList, eventItem, index) {
    const totalRoomsCreated = eventItem.accommodation_rooms.length;
    if (totalRoomsCreated === 0) {
      eventItemList[index]['roomCreationStatusColor'] = 'red';
      eventItemList[index]['roomCreationStatus'] = 'Rooms Not Created';
    } else if (totalRoomsCreated < eventItemList[index].item_capacity && totalRoomsCreated > 0) {

      eventItemList[index]['roomCreationStatusColor'] = 'orange';
      eventItemList[index]['roomCreationStatus'] = 'Rooms Fully Not Created';


    } else {

      eventItemList[index]['roomCreationStatusColor'] = 'green';
      eventItemList[index]['roomCreationStatus'] = 'Rooms Fully Created';


    }
  }


  getRoomAllocationStatus(eventItemList, eventItem, index) {
    const totalEventAttendees = eventItem.accommodation_rooms.filter(obj => obj['event_attendee'] !== null).length;
    if (totalEventAttendees === 0) {
      eventItemList[index]['roomAllocationStatusColor'] = 'red';
      eventItemList[index]['roomAllocationStatus'] = 'No Room Allocated';
    } else if (totalEventAttendees < eventItemList[index].item_capacity && totalEventAttendees > 0) {

      eventItemList[index]['roomAllocationStatusColor'] = 'orange';
      eventItemList[index]['roomAllocationStatus'] = 'Rooms Fully Not Allocated';


    } else {

      eventItemList[index]['roomAllocationStatusColor'] = 'green';
      eventItemList[index]['roomAllocationStatus'] = 'Rooms Fully Allocated';


    }

  }

}
